
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

        console.log("pokrenulo se");
        
        var signupData = {
          email: $scope.email,
          password: $scope.password
        };

        rest.signup(signupData, 
          // Callback
          function(data) {
            console.log(data);
            // Store data
            userData.setEmail(signupData.email);
            userData.setPassword(signupData.password);
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
