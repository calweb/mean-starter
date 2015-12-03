(function() {
  'use strict';

  angular
    .module('admin')
    .factory('AdminService', ['$http', '$rootScope', function($http, $rootScope) {

      // public service methods
      return {
        getUsers: getUsers,
      };


      function getUsers() {

        return $http.get('api/admin/users');
      }



    }]);
})();
