'use strict';

angular.module('facepagesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('apiTest', {
        url: '/apiTest',
        templateUrl: 'app/apiTest/apiTest.html',
        controller: 'ApiTestCtrl'

      });
  });
