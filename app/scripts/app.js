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
        templateUrl: 'views/wall-list.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'MainCtrl'
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
  });
