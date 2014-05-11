
'use strict';

angular.module('photowallWebApp')
  .controller('WallCtrl', [
    '$scope',
    '$routeParams',
    'services.rest',
    'services.socket',
    function ($scope, $routeParams, rest, socket) {

      // Fetch photos - first 4?
      $scope.wallName = $routeParams.wallName;
      $scope.photos   = [];

      rest.getPhotos($scope.wallName, 
        // Callback
        function(photosObject) {

          // TODO: do sth with these pics
          $scope.photos = photosObject.data;

          console.log($scope.photos);

        },
        // Error
        function(data) {
          console.log("error: getPhotos()");
        }
      );

      socket.registerListener(function(msg) {
        $scope.$apply(function() {
          $scope.photos.push(msg.data);          
        });
      });

      /*
      // Final resulst
      $scope.photosToShow = undefined;
      */

}]);
