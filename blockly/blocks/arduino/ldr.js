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

    // Call onchange to initialize warnings and pin updates
    this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for pin conflicts with other blocks and local duplicate pin assignments within the block.
   */
  onchange: function () {
    var pin = this.getFieldValue("PIN");
    this.checkPinConflictsAndUpdatePins_(pin);
  },

  /**
   * Checks for pin conflicts with other blocks and sets a warning if any are found.
   * @param {string} pin - The selected analog pin.
   */
  checkPinConflictsAndUpdatePins_: function (pin) {
    var warnings = [];

    // Check against all blocks in the workspace for conflicts
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.id !== this.id) {
        if (block.type === "ldr_setup") {
          // Check conflicts with other instances of ldr_setup
          var otherPin = block.getFieldValue("PIN");
          if (pin === otherPin) {
            warnings.push("Pin conflict with another LDR setup block!");
          }
        } else if (block.type === "ldr_read") {
          // Check conflicts with ldr_read blocks
          var readPin = block.getFieldValue("PIN");
          if (pin === readPin) {
            warnings.push("Pin " + pin + " is used in another LDR read block.");
          }
        }
      }
    });

    // Set warning text if conflicts are found
    if (warnings.length > 0) {
      this.setWarningText(warnings.join("\n"));
    } else {
      this.setWarningText(null);
    }
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
