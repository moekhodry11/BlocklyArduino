"use strict";
goog.provide("Blockly.Blocks.ldr.js");
goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.ldr.HUE = 230;

//read

Blockly.Blocks["ldr_read"] = {
  init: function () {
    this.appendDummyInput().appendField("Read LDR");
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setColour(Blockly.Blocks.ldr.HUE);
    this.setTooltip("Read LDR");
    this.setHelpUrl("");
  },
};

//make a dropdown menu to choose the pin

Blockly.Blocks["ldr_setup"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Setup LDR")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analogPins),
        "PIN"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.ldr.HUE);
    this.setTooltip("Setup LDR");
    this.setHelpUrl("");
  },
};
