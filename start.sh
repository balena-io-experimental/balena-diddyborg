while true; do
    echo '{\n "INVERT_MOTORS_DIRECTION": $INVERT_MOTORS_DIRECTION,\n "INVERT_JOYPAD_DIRECTION": $INVERT_JOYPAD_DIRECTION,\n "INVERT_JOYPAD_AXES": $INVERT_JOYPAD_AXES\n }' > /data/env_configs.json
    modprobe i2c-dev && true
    modprobe bcm2835-v4l2 && true
    node /app/index.js
done
