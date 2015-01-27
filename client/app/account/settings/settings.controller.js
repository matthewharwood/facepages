'use strict';

angular.module('facepagesApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $http) {
    $scope.errors = {};

    $http.get('/api/users/me').success(function (user) {
      $scope.currentUser = user;
    });


    $scope.inlineEdit = {
      skills: false,
      name: false,
      bio: false
    };
    $scope.editglyp = {
      skills: false,
      name: false,
      bio: false
    };
    $scope.defaultSkills = 'Double click to add skills';
    $scope.toggleEditIcon = function (type, bool) {

      $scope.editglyp[type] = bool;
    };

    $scope.toggleInlineEdit = function (type, bool) {
      $scope.inlineEdit[type] = bool;
    };

    $scope.commaseperator = function (val) {
      $scope.currentUser.skills = val;
    };

    $scope.changeBio = function(bio){
      $scope.currentUser.bio = bio;
      $http.patch('/api/users/me', $scope.currentUser).success(function(user){
        $scope.currentUser = user;
      });
    };
    $scope.changeSkills = function () {
      $http.patch('/api/users/me', $scope.currentUser).success(function (user) {
        $scope.currentUser = user;
        console.log(user);
      })
    };

    //this needs to be filled out
    $scope.changeName = function (name) {
      $scope.currentUser.name = name;
      $http.patch('/api/users/me', $scope.currentUser).success(function (user) {
        $scope.currentUser = user;
      })
    };
    $scope.changePassword = function (form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(function () {
            $scope.message = 'Password successfully changed.';
          })
          .catch(function () {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
          });
      }
    };
  });
