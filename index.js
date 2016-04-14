(function() {
  'use strict';
  const pbr = require('picoborgrev').picoborgrev();
  const app = require('express')();
  const http = require('http').Server(app);
  const io = require('socket.io')(http);
  const serveStatic = require('serve-static');
  const async = require('async');
  const raspivid = require('raspivid');
  const video = raspivid();
  const fs = require('fs');
  const chalk = require('chalk');
  const randomToken = require('random-token');
  const token = randomToken(6);

  /* Express */
  app.get('/', function(req, res){
    res.sendfile(__dirname+'/app/index.html');
  });

  app.use(serveStatic(__dirname+'/app', {'index': ['index.html']}));
  http.listen(80, function () {
    console.log('AccessToken: '+chalk.cyan(token));
  });

  /* Socket */
  io.on('connection', function(socket){
    socket.on('motor1', function(power,userToken){
      if (userToken == token) {
        pbr.SetMotor1(power, function(err){
          if (err){
              console.error(err);
          }
        });
      } else {
        console.log('Unauthorized');
      }
    });
    socket.on('motor2', function(power,userToken){
      if (userToken == token) {
        pbr.SetMotor2(power, function(err){
          if (err){
              console.error(err);
          }
        });
      } else {
        console.log('Unauthorized');
      }
    });
    socket.on('motors', function(power,userToken){
      if (userToken == token) {
        pbr.SetMotors(power, function(err){
          if (err){
              console.error(err);
          }
        });
      } else {
        console.log('Unauthorized');
      }
    });
  });

  // Stop motors on process close for safety
  process.on('SIGINT', function() {
      pbr.MotorsOff(function(err){
          if ( err ){
              console.log("Error: " + err);
          }
      });
  });
  process.on('SIGTERM', function() {
      pbr.MotorsOff(function(err){
          if ( err ){
              console.log("Error: " + err);
          }
      });
  });

})();
