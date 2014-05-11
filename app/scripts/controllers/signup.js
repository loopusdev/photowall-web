
'use strict';

angular.module('photowallWebApp')
  .controller('SignUpCtrl', [
    '$scope',
    '$location',
    'services.rest',
    'services.userData',
    function ($scope, $location, rest, userData) {

      $scope.email      = undefined;
      $scope.password   = undefined;
      $scope.passAgain  = undefined;

      $scope.signup = function() {

        // Check form
        if (!$scope.signupForm.$valid) {
          $scope.errorMsg = "Invalid form";
          return;
        } else {
          $scope.errorMsg = undefined;
        }
        
        var signupData = {
          email: $scope.email,
          password: $scope.password
        };

        rest.signup(signupData, 
          // Callback
          function(response) {
            console.log(response);
            // Store data
            userData.setUserId(response.id);
            userData.setEmail(signupData.email);
            userData.setPassword(signupData.password);
            userData.setLoginCache(true);
            // Continue to return route (one from which it came)
            console.log(userData.returnRoute);
            $location.url(userData.returnRoute);
          },
          // Error
          function(response) {
            $scope.errorMsg = "Wrong username/pass";
          }
        );
      };

}]);
