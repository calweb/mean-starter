angular
.module('favs')
.factory('FavoriteService', function ($http, $rootScope) {
  var favNum = 0;
  var favPics = [];
  var clearFavs = function () {
    favNum = 0;
  };
  var getFavs = function () {
    return favNum;
  };

  var getFavPics = function () {
    return favPics;
  };
  var addFavPic = function (newFav) {
    favNum++;
    favPics.push(newFav);
    $rootScope.$broadcast('fav:added');
  };
  var getPic = function (idx) {
    console.log(favPics[parseInt(idx)]);
    return favPics[parseInt(idx)];
  };

  return {
    favs: getFavs,
    clearFavs: clearFavs,
    addFav: addFavPic,
    getFavPics: getFavPics,
    getFavPic: getPic
  }



})
