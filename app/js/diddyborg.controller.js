function DiddyborgController(DiddyborgService) {
  var ctrl = this;
  this.token= '';
  this.setMotorRight = function (gaugeRight) {
    if (!gaugeRight) {
      return;
    }
    DiddyborgService.motorRight(parseInt((gaugeRight)*100),ctrl.token);
  };
  this.setMotorLeft = function (gaugeLeft) {
    if (!gaugeLeft) {
      return;
    }
    DiddyborgService.motorLeft(parseInt((gaugeLeft)*100),ctrl.token);
  };

}

angular
  .module('ngDiddyborg')
  .controller('DiddyborgController', DiddyborgController);
