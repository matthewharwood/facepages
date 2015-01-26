'use strict';

angular.module('facepagesApp')
  .controller('ApiTestCtrl', function ($scope, $http, socket) {
    var images = [];
    var video;
    var dataURL;


    function setup(){
      navigator.myGetMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);
      navigator.myGetMedia({ video: true }, connect, error);
    }

    function error(e){
      console.log(e.status);
    }

    function connect(stream) {
      video = document.getElementById("video");
      video.src = window.URL ? window.URL.createObjectURL(stream) : stream;
      video.play();
    }

    $scope.captureImage = function() {
      var canvas = document.createElement('canvas');
      canvas.id = 'hiddenCanvas';
      //add canvas to the body element
      document.body.appendChild(canvas);
      //add canvas to #canvasHolder
      document.getElementById('canvasHolder').appendChild(canvas);
      var ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth / 4;
      canvas.height = video.videoHeight / 4;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      //save canvas image as data url
      images.push(canvas.toDataURL());
      //set preview image src to dataURL
      console.log(images);
    };

    setup();





    $http.get('/api/users').success(function(users){
      $scope.users = users;
    });

    $scope.createUser = function(){
      return $http({
        method: "post",
        url: '/api/users',

        data: {
          name: $scope.name,
          email: { type: "test@testingga.com", lowercase: true },
          role: {
            type: "developer",
            default: 'user'
          },
          hashedPassword: "a",
          provider: "a",
          salt: "a",
          facebook: {},
          twitter: {},
          google: {},
          github: {},
          skills: ["temp"],
          imgs: images,
          bio: $scope.bio
        }
      }).then(function (response) {
        console.log(response);
      });
    }
    $scope.editUser = function(){
      return $http({
        method: "put",
        url: "/api/users"
      })
    }

    $scope.addImage = function(){

    }




//http://coderthoughts.blogspot.co.uk/2013/03/html5-video-fun.html - thanks :)





  });








/*
 $scope.awesomeThings = [];

 $http.get('/api/things').success(function(awesomeThings) {
 $scope.awesomeThings = awesomeThings;
 socket.syncUpdates('thing', $scope.awesomeThings);
 });

 $scope.addThing = function() {
 if($scope.newThing === '') {
 return;
 }
 $http.post('/api/things', { name: $scope.newThing });
 $scope.newThing = '';
 };

 $scope.deleteThing = function(thing) {
 $http.delete('/api/things/' + thing._id);
 };

 $scope.$on('$destroy', function () {
 socket.unsyncUpdates('thing');
 });
 */
