angular.module('mean-starter')
  .controller('NavbarCtrl', function($scope, $auth, authorizations) {
    $scope.checkRole = function (role) {
      return authorizations.checkRole(role);
    };
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    console.log('member',$scope.checkRole('member'));
    console.log('admin', $scope.checkRole('admin'));

  });
