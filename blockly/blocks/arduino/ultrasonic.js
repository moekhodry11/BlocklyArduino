"use strict";
goog.provide("Blockly.Blocks.ultrasonic");
goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.ultrasonic.HUE = 230;



Blockly.Blocks["ultrasonic_setup"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Ultrasonic Sensor")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "TRIG")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "ECHO");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.ultrasonic.HUE);
    this.setTooltip("Setup the Ultrasonic Sensor");
    this.setHelpUrl("");
  }
};


Blockly.Blocks["ultrasonic_read"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Read Ultrasonic Sensor")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "TRIG")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins), "ECHO");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.ultrasonic.HUE);
    this.setTooltip("Read the Ultrasonic Sensor");
    this.setHelpUrl("");
  }
};