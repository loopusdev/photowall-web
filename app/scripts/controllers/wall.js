
'use strict';

angular.module('photowallWebApp')
  .controller('WallCtrl', [
    '$scope',
    '$routeParams',
    'services.rest',
    function ($scope, $routeParams, rest) {

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

      /*
      // Final resulst
      $scope.photosToShow = undefined;
      */

      console.log("ja sam wall controller za: " + $routeParams.wallName);

}]);
