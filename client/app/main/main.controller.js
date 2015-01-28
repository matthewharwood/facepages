'use strict';

angular.module('facepagesApp')
  .controller('MainCtrl', function ($scope, $http, socket, $timeout) {
    $scope.users = [];

    $http.get('/api/users').success(function(users) {
      $scope.users = users;

      $timeout(function(){
        var firstImg = $('.emptyimg');
        $scope.imgHeight = {
          height: (firstImg.width()) + 'px'
        };
      },1000)
    });
    socket.socket.on('user:save', function(data){
      $http.get('/api/users').success(function(users) {
        $scope.users = users;
      });
    });

  });
