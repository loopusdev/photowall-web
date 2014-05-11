
'use strict';

angular.module('photowallWebApp')
  .controller('WallCtrl', [
    '$scope',
    '$routeParams',
    'services.rest',
    'services.socket',
    '$timeout',
    '$location',
    function ($scope, $routeParams, rest, socket, $timeout, $location) {

      // Fetch photos - first 4?
      $scope.wallID   = undefined;
      $scope.wallName = $routeParams.wallName;
      $scope.activePhotos = []; // Photos that are shown on wall
      $scope.inactivePhotos = []; // Photos not shown on wall
      var numMaxActivePhotos = 40; // Maximal number of active photos


      rest.getWall($scope.wallName,
        // Callback
        function(wallObject) {
          console.log("dobio wall id: " + wallObject.data.id);
          $scope.wallID = wallObject.data.id;

          rest.getPhotos($scope.wallName, 
            // Callback
            function(photosObject) {
              var photos = photosObject.data;
              $scope.activePhotos =   photos.slice(0, numMaxActivePhotos);
              $scope.inactivePhotos = photos.slice(numMaxActivePhotos);
            },
            // Error
            function(data) {
              console.log("error: getPhotos()");
            });
        },
        // Error
        function(data) {
          // Go to home if
          $location.url('/');
        }
      );

      socket.registerListener(function(msg) {
        $scope.$apply(function() {
          // Check id - if matches, push to photos array
          if (msg.data.wallId === $scope.wallID) {
            // move one from active to inactive photos and push new to active
            $scope.inactivePhotos.push($scope.activePhotos[0]);
            $scope.activePhotos[0] = msg.data;
          }    

        });
      });

      var getRandom = function(upperBound) {
        return Math.floor(Math.random() * upperBound);
      };

      // Each 3 seconds, swap one photo from inactive photos with one from active photos
      var swapRandomPhoto = function() {
        var idActive = getRandom($scope.activePhotos.length - 1) + 1;
        var idInactive = getRandom($scope.inactivePhotos.length);
        var tmp = $scope.inactivePhotos[idInactive];
        $scope.inactivePhotos[idInactive] = $scope.activePhotos[idActive];
        $scope.activePhotos[idActive] = tmp;
        $timeout(function() {
          swapRandomPhoto();
        }, 3000);
      };

      swapRandomPhoto();

}]);
