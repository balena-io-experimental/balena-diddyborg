function DiddyborgController(DiddyborgService) {
  'use strict';
  var ctrl = this;
  this.token= '';
  this.motor1 = 0;
  this.motor2 = 0;
  this.setMotorRight = function (gaugeRight) {
    if (!gaugeRight) {
      return;
    }
    this.motor1 = DiddyborgService.motorRight(parseInt((gaugeRight)*-100),ctrl.token);
    return this.motor1;
  };
  this.setMotorLeft = function (gaugeLeft) {
    if (!gaugeLeft) {
      return;
    }
    this.motor2 = DiddyborgService.motorLeft(parseInt((gaugeLeft)*-100),ctrl.token);
    return this.motor2;
  };

}

angular
  .module('ngDiddyborg')
  .controller('DiddyborgController', DiddyborgController);
