function DiddyborgService() {
  var socket = io();
  function motorRight(gaugeRight,token) {
    return socket.emit('motor1', gaugeRight, token);
  }
  function motorLeft(gaugeLeft,token) {
    return socket.emit('motor2', gaugeLeft,token);
  }

  return {
    motorRight: motorRight,
    motorLeft: motorLeft
  };
}

angular
  .module('ngDiddyborg')
  .service('DiddyborgService', DiddyborgService);
