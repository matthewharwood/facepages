'use strict';

angular.module('facepagesApp')
  .directive('capture', function () {
    return {
      templateUrl: 'app/account/signup/capture/capture.html',
      restrict: 'EA',
      controller: function($scope){
        $scope.counter = [1,2,3];
      },
      link: function (scope, element, attrs) {
      }
    };
  });