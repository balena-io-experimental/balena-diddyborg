function DiddyborgService() {
  'use strict';

  let host = window.location.host;

  let socket = new WebSocket( 'ws://' + host + '/motor' );

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
    if (connected) socket.send(JSON.stringify({event: 'motor1', power: gaugeRight, token: token}));
    else console.log('Motors not connected');
    return -gaugeRight;
  }

  function motorLeft(gaugeLeft, token) {
    console.log('motorLeft');
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
