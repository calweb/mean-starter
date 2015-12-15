angular
  .module('favs')
  .controller('FavsController', function ($scope,FavoriteService, $stateParams) {
    var vm = this;
    $scope.favPics = FavoriteService.getFavPics();

    if($stateParams.favId) {
      vm.picDetail = FavoriteService.getFavPic($stateParams.favId);
      // vm.picDetail = "hello world!"
    }



  });
