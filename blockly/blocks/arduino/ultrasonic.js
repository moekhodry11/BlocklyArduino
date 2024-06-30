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
    this.setInputsInline(false);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.ultrasonic.HUE);
    this.setTooltip("Setup the Ultrasonic Sensor");
    this.setHelpUrl("");


   
  },

  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      "TRIG",
      "digitalPins"
    );
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
      this,
      "ECHO",
      "digitalPins"
    );
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

    Blockly.getMainWorkspace().addChangeListener(this.workspaceChange.bind(this));
  },

  /**
   * Called whenever the block's fields change.
   * Checks for pin conflicts with other blocks and local duplicate pin assignments within the block.
   */
  workspaceChange: function () {
    var trigPin = this.getFieldValue("TRIG");
    var echoPin = this.getFieldValue("ECHO");
    this.checkInitBlockPresenceAndPinConflicts_(trigPin, echoPin);
  },

  /**
   * Checks if the init block for the ultrasonic sensor has been used and for pin conflicts.
   * Sets a warning if any issues are found.
   * @param {string} trigPin - The selected trigger pin.
   * @param {string} echoPin - The selected echo pin.
   */
  checkInitBlockPresenceAndPinConflicts_: function (trigPin, echoPin) {
    var warnings = [];

    // Check if there is an ultrasonic_setup block with the same trigger and echo pins
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (
        block.type === "ultrasonic_setup" &&
        block.getFieldValue("TRIG") === trigPin &&
        block.getFieldValue("ECHO") === echoPin
      ) {
        initBlockExists = true;
      }
    });

    // If no init block is found, issue a warning
    if (!initBlockExists) {
      warnings.push(
        "Initialize the Ultrasonic Sensor with trigger pin " +
          trigPin +
          " and echo pin " +
          echoPin +
          " first using ultrasonic setup block."
      );
    }

    // Check for local duplicate pin assignments within the block
    if (trigPin === echoPin) {
      warnings.push("Trigger pin and echo pin must be different!");
    }



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
    return Blockly.Types.DECIMAL;
  },
};
