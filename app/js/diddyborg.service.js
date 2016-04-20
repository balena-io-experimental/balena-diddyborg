function DiddyborgService() {
  'use strict';
  var socket = io();
  function motorRight(gaugeRight,token) {
    socket.emit('motor1', gaugeRight, token);
    return gaugeRight;
  }
  function motorLeft(gaugeLeft,token) {
    socket.emit('motor2', gaugeLeft,token);
    return gaugeLeft;
  }

  return {
    motorRight: motorRight,
    motorLeft: motorLeft
  };
}

angular
  .module('ngDiddyborg')
  .service('DiddyborgService', DiddyborgService);
