
angular.module('photowallWebApp')
  .factory('services.userData', [
    '$cookies',
    'services.rest',
    function($cookies, rest) {

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
      
      var isLoggedInCache = null;
      /**
       * @param callback (fun(loginStatus)) Function that takes true if user is logged in, otherwise false.
       */
      var isLoggedIn = function(callback) {
        if (isLoggedInCache != null) {
          callback(isLoggedInCache);
        } else {
          rest.login({email: getEmail(), password: getPassword()}, 
            function(data) {
              isLoggedInCache = true;
              callback(true);
            },
            function(data) {
              isLoggedInCache = false;
              callback(false);
            }
          );
        }
      };

      return {
        setEmail: setEmail,
        getEmail: getEmail,

        setPassword: setPassword,
        getPassword: getPassword,

        isLoggedIn: isLoggedIn,

        // Route to which user will go after successful login
        returnRoute: '/'
      };

    }]);
