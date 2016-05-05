function DiddyborgService() {
  'use strict';

  let socket = new WebSocket( 'ws://192.168.178.49:80/motor' );

  let connected = false;
  socket.onopen = function(event) {
    console.log('Motors connected');
    connected = true;

    socket.onclose = function(event) {
      connected = false;
      console.log('Motors disconnected');
    };
  };

  function motorRight(gaugeRight, token) {
    console.log('motorRight');
    if (connected) socket.send('motor1', gaugeRight, token);
    else console.log('Motors not connected');
    return -gaugeRight;
  }

  function motorLeft(gaugeLeft, token) {
    console.log('motorLeft');
    if (connected) socket.send('motor2', gaugeLeft, token);
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
