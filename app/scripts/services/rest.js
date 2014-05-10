
angular.module('photowallWebApp')
  .factory('services.rest', [
    '$http',
    function($http) {

      var baseUrl = 'http://photowall-backend.herokuapp.com/';

      var getPhotos = function(wallName, callback, error) {
        $http.get(baseUrl + 'wall/' + wallName)
          .success(function(data) {
            callback(data);
          })
          .error(function(data) {
            error(data);
          });
      };

      var login = function(userData, callback, error) {
        $http.post(baseUrl + 'user/login/', userData)
          .success(function(data) {
            callback(data);
          })
          .error(function(data) {
            error(data);
          });
      };

      var signup = function(userData, callback, error) {
        $http.post(baseUrl + 'user/', userData)
          .success(function(data) {
            callback(data);
          })
          .error(function(data) {
            error(data);
          });
      };

      var createWall = function(wallData, callback, error) {
        $http.post(baseUrl + 'wall/', wallData)
          .success(function(data) {
            callback(data);
          })
          .error(function(data) {
            error(data);
          });
      };

      return {
        getPhotos:  getPhotos,
        login:      login,
        signup:     signup,
        createWall: createWall,
      };

    }]);
   
