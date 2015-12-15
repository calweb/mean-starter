angular.module('starter.controllers', [])
.controller('TabController', function ($scope, FavoriteService) {
  $scope.favs = FavoriteService.favs();
  $scope.clearFavs = function () {
    FavoriteService.clearFavs();
    $scope.favs = FavoriteService.favs();
  }
  $scope.$on('fav:added', function () {
    $scope.favs = FavoriteService.favs();
  })
})
.controller('LoginController', function ($scope,$state, $stateParams, $auth, $ionicPopup, $window) {
  $scope.isAuthenticated = function () {
    return $auth.isAuthenticated();
  }
  $scope.login = function() {
      $auth.login({
          email: $scope.email,
          password: $scope.password
        })
        .then(function(res) {
          console.log(res);
          $window.localStorage.setItem('userRole', res.data.role);
          $state.go('tab.photos');
        })
        .catch(function(response) {

        });
    };
  $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(res) {
          $window.localStorage.setItem('userRole', res.data.role);
          $ionicPopup.alert({
            title: 'Success',
            content: 'You have successfully logged in!'
          });
          $state.go('tab.photos');
        })
        .catch(function(response) {
          $ionicPopup.alert({
            title: 'Error',
            content: response.data ? response.data || response.data.message : response
          })

        });
    };


    $scope.logout = function() {
      $auth.logout().then(function () {

        $ionicPopup.alert({
          title: "You've been logged out!"
        });
        $state.go('login');
      })
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
})
.controller('AccountCtrl', function($scope, $auth) {
  $scope.settings = {
    enableFriends: true
  };
});
