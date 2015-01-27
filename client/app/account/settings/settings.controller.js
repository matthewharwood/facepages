'use strict';

angular.module('facepagesApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};
    $scope.currentUser = Auth.getCurrentUser();

    $scope.inlineEdit = {
      skills: false,
      name: false,
    };
    $scope.editglyp = {
      skills: false,
      name: false
    };
    $scope.defaultSkills = 'Double click to add skills';
    $scope.toggleEditIcon = function(type, bool){
      console.log(type, bool);
      $scope.editglyp[type] = bool;
    };

    $scope.toggleInlineEdit = function(type, bool){
      $scope.inlineEdit[type] = bool;
    };

    $scope.commaseperator = function(val){
      $scope.user.skills = val;
    }

    //this needs to be filled out
    $scope.changeName = function(form) {

    };
    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
