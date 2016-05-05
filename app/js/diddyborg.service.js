function DiddyborgService() {
  'use strict';
  var socket = io('192.168.178.49');
  function motorRight(gaugeRight,token) {
    socket.emit('motor1', gaugeRight, token);
    return -gaugeRight;
  }
  function motorLeft(gaugeLeft,token) {
    socket.emit('motor2', gaugeLeft,token);
    return -gaugeLeft;
  }

  return {
    motorRight: motorRight,
    motorLeft: motorLeft
  };
}

angular
  .module('ngDiddyborg')
  .service('DiddyborgService', DiddyborgService);
