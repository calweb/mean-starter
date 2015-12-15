angular
  .module('favs', [
    'ui.router'
  ])
  .config(function ($stateProvider) {
      $stateProvider
        .state('tab.favs', {
          url: '/favs',
          views: {
            'tab-favs': {
          templateUrl: 'favs/views/list.html',
          controller: 'FavsController as favsCtrl'
            }
          },
          onEnter: function ($state, $auth) {
            if(!$auth.isAuthenticated()) $state.go('login');
          }
        })
        .state('tab.fav-detail', {
          url: '/favs/:favId',
          views: {
            'tab-favs': {
              templateUrl: 'favs/views/detail.html',
              controller: 'FavsController as favsCtrl'
            }

          },
          onEnter: function ($state, $auth) {
            if(!$auth.isAuthenticated()) $state.go('login');
          }

        });

    });
