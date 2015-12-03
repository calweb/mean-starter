angular.module('profile')
  .factory('Account', function($http, $dispatcher) {
    return {
      getProfile: function() {
        return $http.get('/api/me');
      },
      updateProfile: function(profileData) {
        return $http.put('/api/me', profileData);
      }

    };
  });
