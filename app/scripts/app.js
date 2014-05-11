'use strict';

angular.module('photowallWebApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'wu.masonry'
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
    '$rootScope',
    'services.userData',
    '$location',
    'services.rest',
    function($rootScope, userData, $location, rest) {

      $rootScope.$on('$locationChangeStart', function(event, next, current) {
        // If user should be logged in, send him to login
        var urlNext = next.split('#')[1];
        if (urlNext == '/walls' || urlNext.indexOf('/walls/') == 0
            || urlNext == '/manager' || urlNext.indexOf('/manager/') == 0) {
          userData.isLoggedIn(function(loggedIn) {
            if (!loggedIn) {
              userData.returnRoute = urlNext;
              $location.url('/login');
            }
          });
        }
      });

  }]);
