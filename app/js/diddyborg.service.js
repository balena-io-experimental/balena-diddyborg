function DiddyborgService() {
  'use strict';

  let socket = new WebSocket( 'ws://192.168.178.49:80/motor' );

  let connected = false;
  socket.onopen = function(event) {
    console.log('Motors connected');
    connected = true;
    motorRight(80,'token');

    socket.onclose = function(event) {
      connected = false;
      console.log('Motors disconnected');
    };
  };

  function motorRight(gaugeRight, token) {
    console.log('motorRight');
    if (connected) socket.send({event: 'motor1', power: gaugeRight, token: token});
    else console.log('Motors not connected');
    return -gaugeRight;
  }

  function motorLeft(gaugeLeft, token) {
    console.log('motorLeft');
    if (connected) socket.send({event: 'motor2', power: gaugeLeft, token: token});
    else console.log('Motors not connected');
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
