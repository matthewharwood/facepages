'use strict';

angular.module('facepagesApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.users = [];

    $http.get('/api/users').success(function(users) {
      $scope.users = users;
    });
    socket.socket.on('user:save', function(data){
      console.log('caught socket emit');
      $http.get('/api/users').success(function(users) {
        $scope.users = users;
      });

    });
  });
