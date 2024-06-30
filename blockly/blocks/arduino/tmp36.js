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

    // Call onchange to initialize warnings and pin conflict check
    this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for pin conflicts with other blocks and sets a warning if any are found.
   */
  onchange: function() {
    var pin = this.getFieldValue("PIN");
    this.checkPinUsage_(pin);
  },

  /**
   * Checks for pin conflicts with ldr_read blocks and sets a warning if any are found.
   * @param {string} pin - The selected pin to check for conflicts.
   */
  checkPinUsage_: function(pin) {
    var warnings = [];

    // Check against all blocks in the workspace for conflicts
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.id !== this.id && block.type === "ldr_read") {
        // Check conflicts with ldr_read blocks
        var otherPin = block.getFieldValue("PIN");
        if (pin === otherPin) {
          warnings.push("Pin conflict with another sensor block!");
        }
      }
    });

    // Set warning text if conflicts are found
    if (warnings.length > 0) {
      this.setWarningText(warnings.join("\n"));
    } else {
      this.setWarningText(null);
    }
  }
};






