function DiddyborgController(DiddyborgService, $mdSidenav, $mdDialog, $sce) {
  'use strict';
  var ctrl = this;
  this.token = '';
  this.motor1 = 0;
  this.motor2 = 0;
  this.toggleSidenav = openSidenav;
  this.openTokenModal = openTokenModal;

  this.setMotorRight = function(gaugeRight) {
    if (!gaugeRight) {
      return;
    }
    this.motor1 = DiddyborgService.motorRight(parseInt((gaugeRight) * 100), ctrl.token);
    return this.motor1;
  };
  this.setMotorLeft = function(gaugeLeft) {
    if (!gaugeLeft) {
      return;
    }
    this.motor2 = DiddyborgService.motorLeft(parseInt((gaugeLeft) * 100), ctrl.token);
    return this.motor2;
  };

  //function to toggle left sidenav
  function openSidenav(componentId) {
    $mdSidenav(componentId).toggle();
  }

  function openTokenModal() {
    $mdDialog.show({
      // controller: ,
      templateUrl: 'app/partials/tokenModal.template.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true
    });
  }

}

angular
  .module('ngDiddyborg')
  .controller('DiddyborgController', DiddyborgController);
