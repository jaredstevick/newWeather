'use strict';

angular.module('ngWeather')
  .controller('NavbarCtrl', function ($scope) {
    $scope.date = new Date();
  });
