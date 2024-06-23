"use strict";
goog.provide("Blockly.Blocks.ultrasonic");
goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.ultrasonic.HUE = 150;


Blockly.Blocks["ultrasonic_setup"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Setup Ultrasonic Sensor")
      .appendField("trigger pin")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "TRIG"
      )
      .appendField("echo pin")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "ECHO"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.ultrasonic.HUE);
    this.setTooltip("Setup the Ultrasonic Sensor");
    this.setHelpUrl("");

    // Call onchange to initialize warnings and pin updates
    this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for pin conflicts with other blocks and local duplicate pin assignments within the block.
   */
  onchange: function () {
    var trigPin = this.getFieldValue("TRIG");
    var echoPin = this.getFieldValue("ECHO");
    this.checkPinConflictsAndUpdatePins_(trigPin, echoPin);
  },

  /**
   * Checks for pin conflicts with other blocks and sets a warning if any are found.
   * Updates the pin fields.
   * @param {string} trigPin - The selected trigger pin.
   * @param {string} echoPin - The selected echo pin.
   */
  checkPinConflictsAndUpdatePins_: function (trigPin, echoPin) {
    var warnings = [];

    // Check for local duplicate pin assignments within the block
    if (trigPin === echoPin) {
      warnings.push("Trigger pin and echo pin must be different!");
    }

    // Check against all blocks in the workspace for conflicts
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.id !== this.id) {
        if (
          block.type === "ultrasonic_setup" ||
          block.type === "ultrasonic_read"
        ) {
          // Check conflicts with other instances of ultrasonic_setup or ultrasonic_read
          var otherTrigPin = block.getFieldValue("TRIG");
          var otherEchoPin = block.getFieldValue("ECHO");
          if (trigPin === otherTrigPin || echoPin === otherEchoPin) {
            warnings.push("Pin conflict with another Ultrasonic block!");
          }
        }
      }
    });

    // Set warning text if conflicts or duplicates are found
    if (warnings.length > 0) {
      this.setWarningText(warnings.join("\n"));
    } else {
      this.setWarningText(null);
    }
  },
};


Blockly.Blocks["ultrasonic_read"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Read Ultrasonic Sensor")
      .appendField("trigger pin")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "TRIG"
      )
      .appendField("echo pin")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "ECHO"
      );
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.ultrasonic.HUE);
    this.setTooltip("Read the Ultrasonic Sensor");
    this.setHelpUrl("");

    // Call onchange to initialize warnings and pin updates
    this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for pin conflicts with other blocks and local duplicate pin assignments within the block.
   */
  onchange: function () {
    var trigPin = this.getFieldValue("TRIG");
    var echoPin = this.getFieldValue("ECHO");
    this.checkPinConflictsAndUpdatePins_(trigPin, echoPin);
  },

  /**
   * Checks for pin conflicts with other blocks and sets a warning if any are found.
   * Updates the pin fields.
   * @param {string} trigPin - The selected trigger pin.
   * @param {string} echoPin - The selected echo pin.
   */
  checkPinConflictsAndUpdatePins_: function (trigPin, echoPin) {
    var warnings = [];

    // Check for local duplicate pin assignments within the block
    if (trigPin === echoPin) {
      warnings.push("Trigger pin and echo pin must be different!");
    }

    // Check against all blocks in the workspace for conflicts
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.id !== this.id) {
        if (
          block.type === "ultrasonic_setup" ||
          block.type === "ultrasonic_read"
        ) {
          // Check conflicts with other instances of ultrasonic_setup or ultrasonic_read
          var otherTrigPin = block.getFieldValue("TRIG");
          var otherEchoPin = block.getFieldValue("ECHO");
          if (trigPin === otherTrigPin || echoPin === otherEchoPin) {
            warnings.push("Pin conflict with another Ultrasonic block!");
          }
        }
      }
    });

    // Set warning text if conflicts or duplicates are found
    if (warnings.length > 0) {
      this.setWarningText(warnings.join("\n"));
    } else {
      this.setWarningText(null);
    }
  },
  
  /**
   * Returns the type of output value for this block.
   * @returns {string} The type name of the output value.
   */
  getBlockType: function () {
    return Blockly.Types.NUMBER;
  },
};

