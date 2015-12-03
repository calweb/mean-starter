(function() {
  'use strict';

  angular
    .module('admin')
    .controller('AdminController', ['$scope', 'AdminService', '$location', '$routeParams', '$auth',
      function($scope, AdminService, $location, $routeParams, $auth) {
        var vm = this;

        vm.isAuthenticated = function() {
          return $auth.isAuthenticated();
        };
        AdminService.getUsers().success(function (users) {
          vm.users = users;
        });

      }
    ]);
})();
