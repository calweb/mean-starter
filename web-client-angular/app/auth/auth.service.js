(function () {
    "use strict";
    angular
        .module('auth')
        .factory('AuthParty', function ($http, $auth) {
            var authenticate = function (provider) {
              return $auth.authenticate(provider);
            };
            return {
                loginorsignup: authenticate
            }
        });

})();