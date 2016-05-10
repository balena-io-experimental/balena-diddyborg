function stream() {
 'use strict';
 return {
   restrict: 'A',
   link: function ($scope, $element, $attrs) {
     var host = window.location.host;
     // Setup the WebSocket connection and start the player
     var client = new WebSocket('ws://' + host + '/stream');

     var canvas = document.getElementById('videoCanvas');
     var player = new jsmpeg(client, {
       canvas: canvas
     });
   }
 };
}

angular
 .module('ngDiddyborg')
 .directive('stream', stream);
