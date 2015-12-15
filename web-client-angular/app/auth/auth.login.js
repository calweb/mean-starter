angular.module('auth')
  .controller('LoginCtrl', function($scope, $alert, $auth, AuthParty) {
    $scope.login = function() {
      $auth.login({
          email: $scope.email,
          password: $scope.password
        })
        .then(function(res) {
          console.log(res);
          localStorage.setItem('userRole', res.data.role);
          $alert({
            content: 'You have successfully logged in',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
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
    $scope.authenticate = function(provider) {
        //AuthParty.loginorsignup(provider).then(function (res) {
        //    console.log(res);
        //});
      $auth.authenticate(provider)
        .then(function(res) {
          console.log(res.data);
          localStorage.setItem('userRole', res.data.role);
          $alert({
            content: 'You have successfully logged in',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .catch(function(response) {
          $alert({
            content: response.data ? response.data.message : response,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };
  });
