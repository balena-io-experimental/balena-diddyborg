while true; do
    modprobe i2c-dev && true
    modprobe bcm2835-v4l2 && true
    node /app/index.js
done
