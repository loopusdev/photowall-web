
'use strict';

angular.module('photowallWebApp')
  .controller('WallCtrl', [
    '$scope',
    '$routeParams',
    'services.rest',
    'services.socket',
    function ($scope, $routeParams, rest, socket) {

      // Fetch photos - first 4?
      $scope.wallID   = undefined;
      $scope.wallName = $routeParams.wallName;
      $scope.photos   = [];


      rest.getWall($scope.wallName,
        // Callback
        function(wallObject) {
          console.log("dobio wall id: " + wallObject.data.id);
          $scope.wallID = wallObject.data.id;
        },
        // Error
        function(data) {
          console.log("error: getWallID()");
        }
      );

      rest.getPhotos($scope.wallName, 
        // Callback
        function(photosObject) {
          $scope.photos = photosObject.data;
        },
        // Error
        function(data) {
          console.log("error: getPhotos()");
        }
      );

      socket.registerListener(function(msg) {
        $scope.$apply(function() {

          // Check id - if matches, push to photos array
          if (msg.data.wallId === $scope.wallID)
            $scope.photos.unshift(msg.data);          

        });
      });

      /*
      // Final resulst
      $scope.photosToShow = undefined;
      */

}]);
