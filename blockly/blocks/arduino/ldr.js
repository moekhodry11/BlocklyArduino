"use strict";
goog.provide("Blockly.Blocks.ldr");
goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.ldr.HUE = 180;
Blockly.Blocks["ldr_read"] = {
  init: function() {
    this.setHelpUrl("https://www.arduino.cc/reference/en/language/functions/analog-io/analogread/");
    this.appendDummyInput()
        .appendField("Read LDR Sensor")
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.analogPins), "PIN");
        // this.setCommentText("ldr_read");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.ldr.HUE);
    this.setTooltip("Read the LDR Sensor");
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
   * Checks for pin conflicts with other blocks and sets a warning if any are found.
   * @param {string} pin - The selected pin to check for conflicts.
   */
  checkPinUsage_: function(pin) {
    var warnings = [];

    // Check against all blocks in the workspace for conflicts
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.id !== this.id && block.type !== "ldr_read") {
        // Exclude ldr_read blocks from conflict check
        if (block.type === "tmp36_read") {
          var otherPin = block.getFieldValue("PIN");
          if (pin === otherPin) {
            warnings.push("Pin conflict with another sensor block!");
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
  }
};
