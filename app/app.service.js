(function () {
  'use strict';
  angular
    .module('mean-starter')
    .provider('authorizations', function () {
      this.$get = function () {
      var checkRole = function (role) {
        var currentRole = localStorage.getItem('userRole');
          if (currentRole === 'admin') {
            return true;
          }
            return currentRole === role;
          };
        return {
          checkRole: checkRole
        };
      };
    });
})();
