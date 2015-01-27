'use strict';

angular.module('facepagesApp')
  .directive('capture', function ($timeout, Auth, $http) {
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

        var user = Auth.getCurrentUser();
        var counter = 0;
        scope.takePic = function(id){
          if (typeof id !== 'undefined') {
            scope.selected = id;
          } else {
            scope.selected = counter % 2 == 0 ? "imgA" : "imgB";
          }
          counter++;
          var canvas = document.getElementById(id || scope.selected);
          var ctx = canvas.getContext('2d');
          canvas.width = video.videoWidth/2;
          canvas.height = video.videoHeight/2;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          var data = {};
          data[scope.selected] = canvas.toDataURL();


          $http.patch('api/users/me', data).success(function(resp){
            console.log(resp);
          })

          //scope.images.push(canvas.toDataURL());


        };
      }
    };
  });
