"use strict";
goog.provide("Blockly.Arduino.ldr.js");
goog.require("Blockly.Arduino");


Blockly.Arduino.ldr_read = function () {
  var pin = this.getFieldValue("PIN");
  var code = "analogRead(" + pin + ")";
  Blockly.Arduino.definitions_["define_ldr_read"] =
    "int readLDR(int pin) {\n  int val = analogRead(pin);\n  return val;\n}\n";
  Blockly.Arduino.includes_['define_ldr'] = '';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

