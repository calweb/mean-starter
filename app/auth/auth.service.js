(function () {
    "use strict";
    angular
        .module('auth')
        .factory('AuthParty', function ($http) {
            var authenticate = function (provider) {
              return $http.get'/auth/' + provider);
            };
            return {
                loginorsignup: authenticate
            }
        });

})();