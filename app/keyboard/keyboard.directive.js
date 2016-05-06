function keyboard() {
  'use strict';
  return {
    restrict: 'AE',
    link: function ($scope, $element, $attrs) {
      var actionMap = {
        37: $scope.digital.setMotors(-100, 100),  //left
        38: $scope.digital.setMotors(100, 100),   //up
        39: $scope.digital.setMotors(100, -100),  //right
        40: $scope.digital.setMotors(-100, -100)  //down
      };
      var body = document.querySelector('body');

      body.onkeydown = function (e) {
        if (typeof actionMap[e.keyCode] !== 'function') {
          return;
        }
        actionMap[e.keyCode]();
      };
    }
  };
}

angular
  .module('ngDiddyborg')
  .directive('keyboard', keyboard);
