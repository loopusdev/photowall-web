
angular.module('photowallWebApp')
  .factory('services.userData', [
    '$cookies',
    function($cookies) {

      // Setters
      var setEmail = function(email) {
        $cookies.email = email;
      };
      var setPassword = function(password) {
        $cookies.password = password;
      };

      // Getters
      var getEmail = function() {
        return $cookies.email;
      };
      var getPassword = function() {
        return $cookies.password;
      };

      return {
        setEmail: setEmail,
        getEmail: getEmail,

        setPassword: setPassword,
        getPassword: getPassword
      };

    }]);
