'use strict';

angular.module('facepagesApp')
  .directive('capture', function () {
    return {
      templateUrl: 'app/main/capture/capture.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });