function poll() {
  return {
    restrict: 'A',
    link: function ($scope, $element, $attrs) {
      $scope.$watch(function () {
        return $attrs.gaugeLeft;
      }, function (newGauge) {
        $scope.diddyborg.setMotorLeft(newGauge);
      });
      $scope.$watch(function () {
        return $attrs.gaugeRight;
      }, function (newGauge) {
        $scope.diddyborg.setMotorRight(newGauge);
      });
    }
  };
}

angular
  .module('ngDiddyborg')
  .directive('poll', poll);
