function keyboard() {
  'use strict';
  return {
    restrict: 'AE',
    link: function($scope, $element, $attrs) {
      var body = document.querySelector('body');

      body.onkeydown = function(e) {
        $('.arrow-selected').removeClass('arrow-selected');
        if (e.keyCode === 37) {
          $('#arrow-left').toggleClass('arrow-selected');
          $scope.digital.setMotors(-1, 1);
        } else if (e.keyCode === 38) {
          $('#arrow-up').toggleClass('arrow-selected');
          $scope.digital.setMotors(1, 1);
        } else if (e.keyCode === 39) {
          $('#arrow-right').toggleClass('arrow-selected');
          $scope.digital.setMotors(1, -1);
        } else if (e.keyCode === 40) {
          $('#arrow-down').toggleClass('arrow-selected');
          $scope.digital.setMotors(-1, -1);
        } else if (e.keyCode === 32) {
          $('.arrow-selected').removeClass('arrow-selected');
          $scope.digital.setMotors(0, 0);
        }
      };
    }
  };
}

angular
  .module('ngDiddyborg')
  .directive('keyboard', keyboard);
