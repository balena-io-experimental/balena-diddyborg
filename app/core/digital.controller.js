function DigitalController(DiddyborgService) {
  'use strict';
  var ctrl = this;

  ctrl.power = 0;

  this.setMotors = function(left, right) {
    if (!ctrl.power) {
      return;
    }
    this.motor1 = DiddyborgService.motorRight(parseInt((ctrl.power) * right), ctrl.token);
    this.motor2 = DiddyborgService.motorLeft(parseInt((ctrl.power) * left), ctrl.token);
  };

}

angular
  .module('ngDiddyborg')
  .controller('DigitalController', DigitalController);
