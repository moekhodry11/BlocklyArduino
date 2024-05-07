"use strict";
goog.provide("Blockly.Blocks.ldr.js");
goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.ldr.HUE = 230;



//make a dropdown menu to choose the pin

Blockly.Blocks["ldr_setup"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Setup LDR#")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"], ["5"], ["6"]]),
        "ID"
      )
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


//read

Blockly.Blocks["ldr_read"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Read LDR#")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"], ["5"], ["6"]]),
        "ID"
      );
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.ldr.HUE);
    this.setTooltip("Read LDR");
    this.setHelpUrl("");
  },
};
