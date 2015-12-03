angular.module('profile')
  .controller('ProfileController', function($scope,$auth, $alert, $http, Account, Transloadit) {

    function getExpiryDate() {
      var date = new Date();
      date.setHours(date.getHours() + 12);

      var year = date.getUTCFullYear();
      var month = zeroFill(date.getUTCMonth() + 1, 2);
      var day = zeroFill(date.getUTCDate(), 2);

      var hours = zeroFill(date.getUTCHours(), 2);
      var minutes = zeroFill(date.getUTCMinutes(), 2);
      var seconds = zeroFill(date.getUTCSeconds(), 2);

      return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds + '+00:00';
    }

    function zeroFill(number, width) {
      width -= number.toString().length;
      if (width > 0) {
        return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
      }

      return number + ""; // always return a string
    }

    $scope.uploadAvatar = function (userId) {
       var file = document.getElementById("myAvatar").files[0];

      Transloadit.upload(file, {
      params: {
        auth: {
            key: 'b37d6ca0315911e5af181bcc05fe1ffd',
            expires: getExpiryDate()
        },
        template_id: 'ab8cd0503a5d11e5a14e55ba3998e015',
        notify_url: 'http://appname.herokuapp.com/api/uploads/notify/' + userId,

      },
      signature: function(callback) {

        return $http.post('/api/uploads/signature', this.params).success(callback);
      },

      progress: function(loaded, total) {
        console.log(loaded + 'bytes loaded');
        console.log(total + ' bytes total');
      },

      processing: function() {
        console.log('done uploading, started processing');
      },

      uploaded: function(assemblyJson) {
        console.log("here it is: ", assemblyJson);
      },

      error: function(error) {

      }

    });
  };

    /**
     * Get user's profile information.
     */
    $scope.getProfile = function() {
      Account.getProfile()
        .success(function(data) {
          $scope.user = data;
        })
        .error(function(error) {
          $alert({
            content: error.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };


    /**
     * Update user's profile information.
     */
    $scope.updateProfile = function() {
      Account.updateProfile({
        displayName: $scope.user.displayName,
        email: $scope.user.email
      }).then(function() {
        $alert({
          content: 'Profile has been updated',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
    };

    /**
     * Link third-party provider.
     */
    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          $alert({
            content: 'You have successfully linked ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .then(function() {
          $scope.getProfile();
        })
        .catch(function(response) {
          $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };

    /**
     * Unlink third-party provider.
     */
    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          $alert({
            content: 'You have successfully unlinked ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .then(function() {
          $scope.getProfile();
        })
        .catch(function(response) {
          $alert({
            content: response.data ? response.data.message : 'Could not unlink ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };

    $scope.getProfile();

  });
