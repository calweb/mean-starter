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
                    controller: 'BlogController'
                })
                .when('/blog/create', {
                    templateUrl: 'blog/views/create.html',
                    controller: 'BlogController'
                })
                .when('/blog/:blogId', {
                    templateUrl: 'blog/views/show.html',
                    controller: 'BlogController'
                })
                .when('/blog/:blogId/edit', {
                    templateUrl: 'blog/views/edit.html',
                    controller: 'BlogController'
                });

        })


})();