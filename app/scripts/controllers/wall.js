
'use strict';

angular.module('photowallWebApp')
  .controller('WallCtrl', [
    '$scope',
    '$routeParams',
    'services.rest',
    function ($scope, $routeParams, rest) {

      // Fetch photos - first 4?
      $scope.wallName = $routeParams.wallName;
      $scope.photos   = undefined;

      rest.getPhotos($scope.wallName, 
        // Callback
        function(data) {
          // Maybe '$apply' is needed
          $scope.photos = data;
        },
        // Error
        function(data) {
          console.log("Desio se error!");
        }
      );

      /*
      // Final resulst
      $scope.photosToShow = undefined;
      */

      console.log("ja sam wall controller za: " + $routeParams.wallName);

}]);
