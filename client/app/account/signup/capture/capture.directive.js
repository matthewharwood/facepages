'use strict';

angular.module('facepagesApp')
  .directive('capture', function ($timeout) {
    return {
      templateUrl: 'app/account/signup/capture/capture.html',
      restrict: 'EA',
      controller: function($scope){
        $scope.set = {};
        $scope.counter = [1,2,3];
        $scope.set.captureHeight = {
          height: (($('.inner-capture').width())/2) + 'px'
        };

        console.log($scope.set.captureHeight);
        navigator.getUserMedia =    navigator.getUserMedia       ||
                                /* chrome и safari           */
                                navigator.webkitGetUserMedia ||
                                /* firefox                   */
                                navigator.mozGetUserMedia    ||
                                /* ie                        */
                                navigator.msGetUserMedia;

        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia({audio: true, video: true},
        function(pLocalMediaStream){
             /*
              * создаём элемент Video,
              * в который помещаем картинку с веб-камеры\
              */
             var lVideo = $("#video");
             

             
             lVideo[0].autoplay = true;
             lVideo[0].src = URL.createObjectURL(pLocalMediaStream);
        },
        function(pError) { /* если возникла ошибка - выводим её */
             alert(pError);
        });
      },
      link: function (scope, element, attrs) {
        scope.takePic = function(){
          console.log('heyhey');
        };
      }
    };
  });