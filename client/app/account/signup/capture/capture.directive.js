'use strict';

angular.module('facepagesApp')
  .directive('capture', function () {
    return {
      templateUrl: 'app/account/signup/capture/capture.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });