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

      $authProvider.google({
        clientId: '469379853070-g23rimletc4dddro1vcqvak3nk3gsrgm.apps.googleusercontent.com',
        url: 'https://mean-starter.herokuapp.com/auth/google'
      });

      $authProvider.github({
        clientId: '0ba2600b1dbdb756688b',
        url: 'https://mean-starter.herokuapp.com/auth/github'
      });
      $authProvider.facebook({
        clientId: 'facebook client id here'
      })



  });
