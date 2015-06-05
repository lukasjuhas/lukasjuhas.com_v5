'use strict';

/**
 * @ngdoc overview
 * @name lukas-juhas
 * @description
 * # lukas-juhas
 *
 * Main module of the application.
 */
angular
  .module('lukas-juhas', [
    'ngAnimate',
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
