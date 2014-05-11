
'use strict';

angular.module('photowallWebApp')
  .controller('WallsCtrl', [
    '$scope',
    '$routeParams',
    'services.rest',
    'services.userData',
    function ($scope, $routeParams, rest, userData) {

      // User data
      $scope.userId   = userData.getUserId();
      $scope.email    = userData.getEmail();
      $scope.wallName = undefined;
      $scope.walls    = [];

    rest.getWalls(
      // Callback
      function(walls) {
        // Extract and store to scope
        angular.forEach(walls, function(wall) {
          if (wall.userId == $scope.userId) {
            $scope.walls.push(wall);
          }
        });
      },
      // Error
      function(walls) {
        console.log('error: getWalls');
      });

      // Called when button clicked
      $scope.createWall = function() {
        var wallData = {
          title: $scope.wallName,
          userId: userData.getUserId()
        };
        console.log(wallData);

        rest.createWall(wallData, 
          // Callback
          function(data) {
            console.log("wall created!");
          },
          // Error
          function(data) {
            console.log('error: wallCreate()');
            console.log(data);
          }
        );
      };
}]);
