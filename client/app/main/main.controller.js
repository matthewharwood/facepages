'use strict';

angular.module('facepagesApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.users = [];

    $http.get('/api/users').success(function(users) {
      $scope.users = users;
      socket.syncUpdates('users', $scope.users);
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
  });
