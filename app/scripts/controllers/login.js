
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
      $scope.errorMsg = undefined;

      $scope.login = function() {
        
        // Check form
        if (!$scope.loginForm.$valid) {
          $scope.errorMsg = "Invalid form";
          return;
        } else {
          $scope.errorMsg = undefined;
        }
        
        var loginData = {
          email: $scope.email,
          password: $scope.password
        };

        rest.login(loginData, 
          // Callback
          function(response) {
            console.log(response);
            // Store data
            userData.setUserId(response.data.id);
            userData.setEmail(loginData.email);
            userData.setPassword(loginData.password);
            userData.setLoginCache(true);
            // Continue to return route (one from which it came)
            $location.url(userData.returnRoute);
          },
          // Error
          function(response) {
            $scope.errorMsg = "Wrong username/pass";
          }
        );
      };

      $scope.registrationOpened = false;
}]);


$( ".slide" ).click(function() {
  $( ".login" ).slideUp( "fast", function() {
  });
});
