'use strict';

angular.module('facepagesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/feed',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        authenticate: true
      });
  });