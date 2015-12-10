(function () {
    "use strict";
    angular
        .module('auth')
        .factory('AuthParty', function ($http) {
            var authenticate = function (provider) {
              return $http.get('https//mean-starter.herokuapp.com/auth/' + provider);
            };
            return {
                loginorsignup: authenticate
            }
        });

})();