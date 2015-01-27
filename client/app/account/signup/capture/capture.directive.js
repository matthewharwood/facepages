'use strict';

angular.module('facepagesApp')

  .directive('capture', function ($timeout, Auth, $interval, $http) {

    return {
      templateUrl: 'app/account/signup/capture/capture.html',
      restrict: 'EA',
      controller: function ($scope) {
        $scope.set = {};
        $scope.countdown = [{power: false, val: 1}, {power: false, val: 2}, {power: false, val: 3}];
        $scope.set.captureHeight = {
          height: (($('.inner-capture').width()) / 2) + 'px'
        };

        console.log($scope.set.captureHeight);
        navigator.getUserMedia = navigator.getUserMedia ||
          /* chrome и safari           */
        navigator.webkitGetUserMedia ||
          /* firefox                   */
        navigator.mozGetUserMedia ||
          /* ie                        */
        navigator.msGetUserMedia;

        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia({audio: false, video: true},
          function (pLocalMediaStream) {
            /*
             * create an element of Video,
             *                which put the picture with a webcam
             */
            var lVideo = $("#video");


            lVideo[0].autoplay = true;
            lVideo[0].src = URL.createObjectURL(pLocalMediaStream);
          },
          function (pError) { /* if an error occurs - derive its */
            console.log(pError)
          });

        $scope.counted = 0;
        $scope.callAtInterval = function () {
          $scope.countdown[$scope.counted].power = true;
          $scope.counted++;
        }

      },
      link: function (scope, element, attrs) {

        $http.get('/api/users/me').success(function (user) {
          scope.user = user;
        });
        scope.selected = "imgA";
        scope.label = "front image";
        scope.setLabels = function(evt){
          if (evt){
            if (scope.selected == "imgA"){
              console.log('change to imgB');
              scope.selected = "imgB";
              scope.label = "back image";
            } else{
              scope.selected = "imgA";
              scope.label = "front image";
            }
          }
        };


        scope.takePic = function (id, $event) {

          $interval(scope.callAtInterval, 1000, 3);
          $timeout(function () {

            if (typeof id !== 'undefined') {
              scope.selected = id;
            }
            var canvas = document.getElementById(scope.selected);
            var ctx = canvas.getContext('2d');
            canvas.width = video.videoWidth / 2;
            canvas.height = video.videoHeight / 2;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            scope.user[scope.selected] = canvas.toDataURL();

            $http.patch('/api/users/me', scope.user).success(function (user) {
              scope.user = user;
              scope.setLabels($event)
            });

            for (var i = 0; i < scope.countdown.length; i++) {
              scope.countdown[i].power = false;
              scope.counted--;
            }

          }, 4000);
          
        };
      }
    };
  });
