
'use strict';

angular.module('photowallWebApp')
  .controller('HomeCtrl', [
    '$scope',
    '$location',
    'services.rest',
    function ($scope, $location, rest) {

      $scope.wallName = undefined;

      $scope.openWall = function() {
        $scope.error = undefined;
        if (!$scope.wallNameForm.$valid) {
          $scope.error = 'Name is not valid! Use only letters, numbers and -';
          return;
        }
      	if ($scope.wallName != undefined) {
          // Check if wall name is valid
          rest.getWall($scope.wallName, 
            function(data) {
              $location.url('/wall/' + $scope.wallName);
            }, function(error) {
              $scope.error = 'There is no wall with name ' + $scope.wallName;
            });
        } else {
          $scope.error = 'You have to specify a name!';
        }
      };

      $scope.openMyWalls = function() {
        $location.url('/walls');
      };

    }]);
