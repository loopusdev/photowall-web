
'use strict';

angular.module('photowallWebApp')
  .controller('WallCtrl', [
    '$scope',
    '$routeParams',
    function ($scope, $routeParams) {

      // Fetch photos - first 4?

      $scope.wallName = $routeParams.wallName;

      console.log("ja sam wall controller za: " + $routeParams.wallName);

}]);
