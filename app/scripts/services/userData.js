
angular.module('photowallWebApp')
  .factory('services.userData', [
    '$cookies',
    'services.rest',
    function($cookies, rest) {

      var setUserId = function(id) {
        $cookies.userId = id;
      };
      var getUserId = function() {
        return $cookies.userId;
      };

      var setEmail = function(email) {
        $cookies.email = email;
      };
      var setPassword = function(password) {
        $cookies.password = password;
      };

      var getEmail = function() {
        return $cookies.email;
      };
      var getPassword = function() {
        return $cookies.password;
      };
      
      var logout = function() {
        // Reset cookies
        $cookies.id       = undefined;
        $cookies.email    = undefined;
        $cookies.password = undefined;
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

      var setLoginCache = function(value) {
        isLoggedInCache = value;
      };

      return {
        setEmail: setEmail,
        getEmail: getEmail,

        setUserId: setUserId,
        getUserId: getUserId,

        setPassword: setPassword,
        getPassword: getPassword,

        isLoggedIn: isLoggedIn,
        logout: logout,

        // Route to which user will go after successful login
        returnRoute: '/',

        setLoginCache: setLoginCache,
      };

    }]);
