(function () {
    "use strict";
    angular
        .module('auth')
        .factory('AuthParty', function ($http) {
            var authenticate = function (provider) {
              return $http.get('http://localhost:3000/auth/' + provider);
            };
            return {
                loginorsignup: authenticate
            }
        });

})();