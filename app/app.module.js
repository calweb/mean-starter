angular.module('mean-starter', [
  'ngMessages',
  'ngRoute',
  'ngSanitize',
  'mgcrea.ngStrap',
  'angular-mapbox',
  'ng-transloadit',
  'auth',
  'admin',
  'profile',
  'blog'
])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/views/home.html'
    })
    .when('/404', {
      template: '<h1>Sorry, page not found</h1>'
    })
    .otherwise({
      redirectTo: '/404'
    });
})
.constant('_', _)
.constant('moment', moment);
