(function () {
    "use strict";

    angular
        .module('blog')
        .controller('BlogController', function (BlogService, $routeParams, $location) {
            var vm = this;
           function getPosts() {

                BlogService.getPosts().success(function (posts) {
                    vm.posts = posts;
                });
            }
            function getPost() {

                BlogService.getPost($routeParams.blogId).success(function (post) {
                    vm.singlePost = post;
                });
            }
            getPosts();

            if($routeParams.blogId) {
                getPost();
            }

            vm.addPost = function (newPost) {
                BlogService.createPost(newPost);
                $location.path('/blog');
            };
            vm.deletePost = function (postId) {
                BlogService.deletePost(postId);
            }




        });


})();