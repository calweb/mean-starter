angular
  .module('starter', [
    'ionic',
    'starter.controllers',
    'moment',
    'underscore',
    'satellizer',
    'flickr',
    'favs'
  ])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
      })
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  })
  .config(function ($authProvider) {
    if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
       $authProvider.cordova = true;
     }
    $authProvider.google({
       clientId: '469379853070-g23rimletc4dddro1vcqvak3nk3gsrgm.apps.googleusercontent.com',
       url: 'https://mean-starter.herokuapp.com/auth/google',
       redirectUri: 'http://localhost'

     });
  });
