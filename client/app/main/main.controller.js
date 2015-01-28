'use strict';

angular.module('facepagesApp')
  .controller('MainCtrl', function ($scope, $http, socket, $timeout) {
    $scope.users = [];

    $http.get('/api/users').success(function(users) {
      $scope.users = users;
      $timeout(function(){
        var firstImg = $('.emptyimg');
        $scope.imgHeight = {
          height: (firstImg.width()) + 'px',
        };
      },1000)
      
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
