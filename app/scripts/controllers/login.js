
'use strict';

angular.module('photowallWebApp')
  .controller('LoginCtrl', [
    '$scope',
    '$location',
    'services.rest',
    'services.userData',
    function ($scope, $location, rest, userData) {

      $scope.email    = undefined;
      $scope.password = undefined;

      $scope.login = function() {
        
        var loginData = {
          email: $scope.email,
          password: $scope.password
        };

        rest.login(loginData, 
          // Callback
          function(data) {
            console.log(data);
            // Store data
            userData.setEmail(loginData.email);
            userData.setPassword(loginData.password);
            // Continue to return route (one from which it came)
            $location.url(userData.returnRoute);
          },
          // Error
          function(data) {
            console.log('error pri loginu!');
            console.log(data);
          }
        );
      };
}]);
