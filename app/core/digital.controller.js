function DigitalController(DiddyborgService, $scope) {
  'use strict';
  var ctrl = this;

  ctrl.power = 0;

  this.setMotors = function(left, right) {
    if (!ctrl.power) {
      return;
    }
    this.motor1 = DiddyborgService.motorRight(parseInt((ctrl.power) * right), $scope.diddyborg.token);
    this.motor2 = DiddyborgService.motorLeft(parseInt((ctrl.power) * left), $scope.diddyborg.token);
  };

  this.stopMotors = function(left, right) {
    if (!ctrl.power) {
      return;
    }
    ctrl.power = 0;
    this.motor1 = DiddyborgService.motorRight(parseInt((ctrl.power) * right), $scope.diddyborg.token);
    this.motor2 = DiddyborgService.motorLeft(parseInt((ctrl.power) * left), $scope.diddyborg.token);
  };

}

angular
  .module('ngDiddyborg')
  .controller('DigitalController', DigitalController);
