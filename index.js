(function() {
  'use strict';
  // const pbr = require('picoborgrev').picoborgrev();
  const app = require('express')();
  // const http = require('http').Server(app);
  const expressWs = require('express-ws')(app);
  // const io = require('socket.io')(http);
  const serveStatic = require('serve-static');
  const exec = require('child_process').exec;
  const async = require('async');
  const chalk = require('chalk');
  const randomToken = require('random-token');
  const token = randomToken(6);
  const STREAM_MAGIC_BYTES = 'jsmp';

  let MotorsGaugeCohefficient = (process.env.INVERT_MOTORS_DIRECTION === "0") ? 1 : -1;
  /* Express */
  app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
  });

  app.use(serveStatic(__dirname, {
    'index': ['index.html']
  }));

  /* Socket */
  app.ws('/motor', function(socket, req) {
    socket.on('message', function(msg) {
      console.log('msg', msg);
    });

    // socket.on('motor1', function(power, userToken) {
    //   if (userToken == token) {
    //     pbr.SetMotor1(power * MotorsGaugeCohefficient, function(err) {
    //       if (err) {
    //         console.error(err);
    //       }
    //     });
    //   } else {
    //     console.log('Unauthorized');
    //   }
    // });
    // socket.on('motor2', function(power, userToken) {
    //   if (userToken == token) {
    //     pbr.SetMotor2(power * MotorsGaugeCohefficient, function(err) {
    //       if (err) {
    //         console.error(err);
    //       }
    //     });
    //   } else {
    //     console.log('Unauthorized');
    //   }
    // });
    // socket.on('motors', function(power, userToken) {
    //   if (userToken == token) {
    //     pbr.SetMotors(power * MotorsGaugeCohefficient, function(err) {
    //       if (err) {
    //         console.error(err);
    //       }
    //     });
    //   } else {
    //     console.log('Unauthorized');
    //   }
    // });
  });

  // // Stop motors on process close for safety
  // process.on('SIGINT', function() {
  //   pbr.MotorsOff(function(err) {
  //     if (err) {
  //       console.log("Error: " + err);
  //     }
  //   });
  // });
  // process.on('SIGTERM', function() {
  //   pbr.MotorsOff(function(err) {
  //     if (err) {
  //       console.log("Error: " + err);
  //     }
  //   });
  // });

  // streaming ------------------------------------
  let width = process.env.STREAM_WIDTH || 640;
  let height = process.env.STREAM_HEIGHT || 480;

  let socketServer = {};

  // Websocket Server
  app.ws('/stream', function(socket, req) {
    // Send magic bytes and video size to the newly connected socket
    // struct { char magic[4]; unsigned short width, height;}
    let streamHeader = new Buffer(8);
    streamHeader.write(STREAM_MAGIC_BYTES);
    streamHeader.writeUInt16BE(width, 4);
    streamHeader.writeUInt16BE(height, 6);
    socket.send(streamHeader, {
      binary: true
    });
    // expressWs.getWss().clients.length

    console.log('New WebSocket Connection (' + socketServer.clients.length + ' total)');

    socket.on('close', function(code, message) {
      console.log('Disconnected WebSocket (' + socketServer.clients.length + ' total)');
    });
  });

  socketServer = expressWs.getWss('/');

  socketServer.broadcast = function(data, opts) {
    for (let i in socketServer.clients) {
      if (socketServer.clients[i].readyState == 1) {
        socketServer.clients[i].send(data, opts);
      } else {
        console.log('Error: Client (' + i + ') not connected.');
      }
    }
  };

  app.use('/stream', function(req, res) {
    if (req.params.password === STREAM_SECRET) {
      res.connection.setTimeout(0);

      console.log('Stream Connected: ' + req.socket.remoteAddress + ':' + req.socket.remotePort + ' size: ' + width + 'x' + height);
      req.on('data', function(data) {
        socketServer.broadcast(data, {
          binary: true
        });
      });
    } else {
      console.log('Failed Stream Connection: ' + req.socket.remoteAddress + req.socket.remotePort + ' - wrong secret.');
      res.end();
    }
  });

  exec('ffmpeg -s ' + height + 'x' + width + ' -f video4linux2 -i /dev/video0 -f mpeg1video -vf "transpose=1" -b 800k -r 30 http://127.0.0.1:80/stream/');


  app.listen(80, function() {
    console.log('AccessToken: ' + chalk.cyan(token));
  });
})();
