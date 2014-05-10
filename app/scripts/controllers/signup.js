
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
            // Send to list-of-walls screen
            $location.url('/walls');
            
            console.log("signuped and data stored to cookies");
          },
          // Error
          function(data) {
            console.log('error pri loginu!');
            console.log(data);
          }
        );
      };

      console.log("ja sam signup kontroler");

}]);
