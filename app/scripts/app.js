'use strict';

angular.module('photowallWebApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/walls', {
        templateUrl: 'views/walls.html',
        controller: 'WallsCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/manager/:wallName', {
        templateUrl: 'views/wall-manager.html',
        controller: 'ManagerCtrl'
      })
      .when('/wall/:wallName', {
        templateUrl: 'views/wall.html',
        controller: 'WallCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run([
      'services.rest', 
      function(rest) {
        // Register to socketIO
        socket.get(rest.baseUrl + "photo", function (response) { console.log (response); });
  }]);
