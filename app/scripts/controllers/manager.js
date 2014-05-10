
'use strict';

angular.module('photowallWebApp')
  .controller('ManagerCtrl', [
    '$scope',
    '$routeParams',
    function ($scope, $routeParams) {

      $scope.wallName = $routeParams.wallName;

      console.log("ja sam manager controller za: " + $routeParams.wallName);

}]);
