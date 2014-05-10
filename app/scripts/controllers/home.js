
'use strict';

angular.module('photowallWebApp')
  .controller('HomeCtrl', [
    '$scope',
    '$location',
    function ($scope, $location) {

      $scope.wallName = undefined;

      $scope.openWall = function() {
        $location.url('/wall/' + $scope.wallName);
      };

}]);
