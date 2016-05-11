function DiddyborgService() {
  'use strict';

  let host = window.location.host;

  let socket = new WebSocket( 'ws://' + host + '/motor' );

  let connected = false;
  socket.onopen = function(event) {
    connected = true;

    socket.onclose = function(event) {
      connected = false;
      console.log('Motors disconnected');
    };
  };

  function motorRight(gaugeRight, token) {
    if (connected) socket.send(JSON.stringify({event: 'motor1', power: gaugeRight, token: token}));
    else console.log('Motors not connected');
    return -gaugeRight;
  }

  function motorLeft(gaugeLeft, token) {
    if (connected) socket.send(JSON.stringify({event: 'motor2', power: gaugeLeft, token: token}));
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
