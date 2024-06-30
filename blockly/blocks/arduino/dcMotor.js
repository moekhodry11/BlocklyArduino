"use strict";
goog.provide("Blockly.Blocks.dcMotor");
goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.ultrasonic.HUE = 150;

Blockly.Blocks['setup_motor'] = {
  init: function() {
    this.setHelpUrl("https://reference.arduino.cc/reference/en/libraries/dcmotor/");
    this.appendDummyInput()
        .appendField("Setup Motor")
        .appendField("Motor #")
        .appendField(new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "MOTOR_NUMBER")
        .appendField("IN1")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),"IN1")
        .appendField("IN2")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),"IN2")
        .appendField("ENA")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.pwmPins),"ENA");
        
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },

  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'IN1', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'IN2', 'digitalPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'ENA', 'pwmPins');
  }
};
Blockly.Blocks['control_motor'] = {
  init: function() {
    this.setHelpUrl("https://reference.arduino.cc/reference/en/libraries/dcmotor/");
    this.appendDummyInput()
        .appendField("Control Motor")
        .appendField("Motor #")
        .appendField(new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),"MOTOR_NUMBER")
        .appendField("Direction")
        .appendField(new Blockly.FieldDropdown([["Forward","FORWARD"], ["Backward","BACKWARD"]]), "DIRECTION")
        .appendField("Speed")
        .appendField(new Blockly.FieldNumber(150, 0, 255), "SPEED");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};