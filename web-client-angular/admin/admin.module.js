(function() {
  'use strict';

  angular
    .module('admin', [
      'ngRoute'
    ])
    .config(function($routeProvider) {
      var checkAuth = function($q, $location, $auth) {
        var dfd = $q.defer();

        if (!$auth.isAuthenticated()) {
          $location.path('/login');
        } else {
          dfd.resolve();
        }
        return dfd.promise;
      };
      var checkRole = function ($q, $location, authorizations) {
        var dfd = $q.defer();
        if(!authorizations.checkRole('admin')) {
          $location.path('/');
        } else {
          dfd.resolve();
        }
        return dfd.promise;
      };
      $routeProvider
        .when('/admin', {
          templateUrl: 'admin/views/list.html',
          controller: 'AdminController as adminCtrl',
          resolve: {
            authenticated: checkAuth,
            checkRole: checkRole
          }
        })
    });

})();
