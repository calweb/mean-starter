(function () {
    "use strict";

    angular
        .module('blog')
        .factory('BlogService', function ($http) {
            var url = '/api/collections/funnyblog';

            return  {
                getPosts: getPosts,
                getPost: getPost,
                createPost: createPost,
                editPost: editPost,
                deletePost: deletePost
            };

            function getPosts() {
                return $http.get(url);
            }
            function getPost(postId) {
                return $http.get(url + '/' + postId);
            }
            function createPost(newPost) {
                $http.post(url, newPost).success(function (res) {
                    console.log(res);
                });
            }
            function editPost(post) {
                $http.put(url + '/' + post._id, post).success(function (res) {
                    console.log(res);
                });
            }
            function deletePost(postId) {
                $http.delete(url + '/' + postId).success(function (res) {
                    console.log(res);
                })
            }



        });


})();