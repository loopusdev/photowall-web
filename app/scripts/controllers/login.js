
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
            // Send to list-of-walls screen
            $location.url('/walls');

            console.log("data stored to cookies");
          },
          // Error
          function(data) {
            console.log('error pri loginu!');
            console.log(data);
          }
        );
      };

      console.log("ja sam login kontroler");

}]);
