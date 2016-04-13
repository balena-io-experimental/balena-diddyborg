# Resin-diddyborg
a [resin.io](http://resin.io) application that allows to remotely control a [Diddyborg](https://www.piborg.org/diddyborg) via local network *or* [PublicURL](http://docs.resin.io/#/pages/management/devices.md#enable-public-device-url)

![diddyborg spinning](http://snappin.io/img/diddyborg_spinning.gif)
### PRE-REQUISITES
this application is meant to be deployed to [RaspberryPi](https://www.raspberrypi.org/products/) devices via [resin.io](http://resin.io).

[Advanced Boot Configuration](http://docs.resin.io/#/pages/configuration/advanced.md#modifying-config-txt-remotely-) parameters:

Parameter | Value
------------ | -------------
**RESIN_HOST_CONFIG_fixup_file** | `fixup_x.dat`
**RESIN_HOST_CONFIG_gpu_mem** | `128`
**RESIN_HOST_CONFIG_start_file** | `start_x.elf`

### Instructions
The device generates a token each startup and prints it in the resin console.
##### If you are working with the apis
simply include in each event the `token` parameter with that value
##### If you are using the web-dashboard
type the token in the field and you are ready to go!

![diddyborg spinning](http://snappin.io/img/diddyborg_dashboard.png)

### Socket events

##### motor1
set the gauge power for motor1 (right wheels). **power** values between `-100` and `100` are allowed. `0` means __*stop*__
```javascript
socket.emit('motor1',80,'token');
```

##### motor2
set the gauge power for motor2 (left wheels). **power** values between `-100` and `100` are allowed. `0` means __*stop*__
```javascript
socket.emit('motor2',80,'token');
```
##### motors
set the gauge power for both motors (all wheels). **power** values between `-100` and `100` are allowed. `0` means __*stop*__
```javascript
socket.emit('motors',80,'token');
```
