"use strict";
goog.provide("Blockly.Arduino.tmp36.js");
goog.require("Blockly.Arduino");



Blockly.Arduino.tmp36_read = function() {
  var pin = this.getFieldValue('PIN');
  var code = 'readTMP36(' + pin + ')';
  Blockly.Arduino.definitions_['define_tmp36'] = 'float readTMP36(int pin) {\n  int val = analogRead(pin);\n  float mv = ( val/1024.0) * 5000;\n  float cel = mv / 10;\n  return cel;\n}\n';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
}


