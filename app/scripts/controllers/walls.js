
'use strict';

angular.module('photowallWebApp')
  .controller('WallsCtrl', [
    '$scope',
    '$routeParams',
    'services.rest',
    'services.userData',
    function ($scope, $routeParams, rest, userData) {

      // User data
      $scope.email = userData.getEmail();

      $scope.wallName = undefined;

      $scope.createWall = function() {
        
        var wallData = {
          title: $scope.wallName
        };

        rest.createWall(wallData, 
          // Callback
          function(data) {

            console.log(data);
            console.log("wall created!");
          },
          // Error
          function(data) {
            console.log('error pri wall create!');
            console.log(data);
          }
        );
      };

      console.log("ja sam walls controller za: " + $routeParams.wallName);
}]);
