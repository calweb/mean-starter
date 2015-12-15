(function () {
    "use strict";

    angular
        .module('blog', [
            'ngRoute'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/blog', {
                    templateUrl: 'blog/views/list.html',
                    controller: 'BlogController as blogCtrl'
                })
                .when('/blogcreate', {
                    templateUrl: 'blog/views/create.html',
                    controller: 'BlogController as blogCtrl'
                })
                .when('/blog/:blogId', {
                    templateUrl: 'blog/views/show.html',
                    controller: 'BlogController as blogCtrl'
                })
                .when('/blog/:blogId/edit', {
                    templateUrl: 'blog/views/edit.html',
                    controller: 'BlogController as blogCtrl'
                });

        })


})();