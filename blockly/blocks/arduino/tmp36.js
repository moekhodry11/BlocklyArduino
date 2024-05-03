"use strict";
goog.provide("Blockly.Blocks.tmp36.js");
goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.tmp36.HUE = 230;


Blockly.Blocks["tmp36_read"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Read TMP36 Sensor")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analogPins), "PIN");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.tmp36.HUE);
    this.setTooltip("Read the TMP36 Sensor");
    this.setHelpUrl("");
  }
};





