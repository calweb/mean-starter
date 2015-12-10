angular.module('auth', [
  'ngMessages',
  'ngRoute',
  'mgcrea.ngStrap',
  'satellizer'
])
  .config(function($routeProvider, $authProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'auth/views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'auth/views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/logout', {
        template: null,
        controller: 'LogoutCtrl'
      })
      .when('/profile', {
        templateUrl: 'auth/views/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          authenticated: function($q, $location, $auth) {
            var deferred = $q.defer();

            if (!$auth.isAuthenticated()) {
              $location.path('/login');
            } else {
              deferred.resolve();
            }

            return deferred.promise;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });



  });
