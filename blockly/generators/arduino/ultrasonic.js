"use strict";
goog.provide("Blockly.Arduino.ultrasonic");
goog.require("Blockly.Arduino");



Blockly.Arduino.ultrasonic_read = function() {
  var pinTrigger = this.getFieldValue('TRIG');
  var pinEcho = this.getFieldValue('ECHO');
  var code = 'readUltrasonic(' + pinTrigger + ', ' + pinEcho + ')';
  Blockly.Arduino.definitions_['define_ultrasonic'] = 'longg readUltrasonic(int trigPin, int echoPin) {\n  long duration, distance;\n  digitalWrite(trigPin, LOW);\n  delayMicroseconds(2);\n  digitalWrite(trigPin, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(trigPin, LOW);\n  duration = pulseIn(echoPin, HIGH);\n  distance = (duration/2) / 29.1;\n  return distance;\n}\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}




Blockly.Arduino.ultrasonic_setup = function() {
  var pinTrigger = this.getFieldValue('TRIG');
  var pinEcho = this.getFieldValue('ECHO');
  Blockly.Arduino.setups_['setup_ultrasonic_' + pinTrigger + '_' + pinEcho] = 'pinMode(' + pinTrigger + ', OUTPUT);\npinMode(' + pinEcho + ', INPUT);';
  return '';
};




