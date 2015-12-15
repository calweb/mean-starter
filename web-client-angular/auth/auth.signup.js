angular.module('auth')
  .controller('SignupCtrl', function($scope, $alert, $auth, AuthParty) {
    $scope.signup = function() {
      $auth.signup({
        displayName: $scope.displayName,
        email: $scope.email,
        password: $scope.password
      }).catch(function(response) {
        if (typeof response.data.message === 'object') {
          angular.forEach(response.data.message, function(message) {
            $alert({
              content: message[0],
              animation: 'fadeZoomFadeDown',
              type: 'material',
              duration: 3
            });
          });
        } else {
          $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        }
      });
    };
    $scope.signUpProvider = function(provider) {

            AuthParty.loginorsignup(provider).then(function (res) {
                console.log(res);
            });
            //$auth.authenticate(provider)
            //  .then(function(res) {
            //    console.log(res.data);
            //
            //    $alert({
            //      content: 'You have successfully logged in',
            //      animation: 'fadeZoomFadeDown',
            //      type: 'material',
            //      duration: 3
            //    });
            //  })
            //  .catch(function(response) {
            //    $alert({
            //      content: response.data ? response.data.message : response,
            //      animation: 'fadeZoomFadeDown',
            //      type: 'material',
            //      duration: 3
            //    });
            //  });

      //$auth.authenticate(provider)
      //    .then(function(res) {
      //      console.log(res.data);
      //
      //      $alert({
      //        content: 'You have successfully logged in',
      //        animation: 'fadeZoomFadeDown',
      //        type: 'material',
      //        duration: 3
      //      });
      //    })
      //    .catch(function(response) {
      //      $alert({
      //        content: response.data ? response.data.message : response,
      //        animation: 'fadeZoomFadeDown',
      //        type: 'material',
      //        duration: 3
      //      });
      //    });
    };
  });
