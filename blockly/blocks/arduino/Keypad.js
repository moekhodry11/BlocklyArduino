"use strict";

goog.provide("Blockly.Blocks.keypad");

goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.keypad.HUE = 0;
Blockly.Blocks["keypad_setup"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Setup Keypad#")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      )
      .appendField(
        new Blockly.FieldDropdown(
          [["4x3"], ["4x4"]],
          this.updateCols_.bind(this)
        ),
        "KEYPAD_TYPE"
      );
    this.appendDummyInput()
      .appendField("Row1:")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "ROWS1"
      )
      .appendField("Row2:")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "ROWS2"
      )
      .appendField("Row3:")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "ROWS3"
      )
      .appendField("Row4:")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "ROWS4"
      );
    this.appendDummyInput()
      .appendField("Col1:")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "COLS1"
      )
      .appendField("Col2:")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "COLS2"
      )
      .appendField("Col3:")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "COLS3"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.keypad.HUE);
    this.setTooltip(Blockly.Msg.ARD_KEYPAD_SETUP_TIP);
    this.size = "4x3";
    this.setFieldValue("4x3", "KEYPAD_TYPE");

    // Initialize with the default size
    this.updateCols_("4x3");

    // Check for pin conflicts and set initial warnings
    this.checkPinConflicts_();
  },

  mutationToDom: function () {
    var container = document.createElement('mutation');
    container.setAttribute('keypad_type', this.getFieldValue('KEYPAD_TYPE'));
    return container;
  },

  domToMutation: function (xmlElement) {
    var keypadType = xmlElement.getAttribute('keypad_type');
    this.updateCols_(keypadType);
    this.setFieldValue(keypadType, 'KEYPAD_TYPE');
  },

  updateCols_: function (size) {
    if (size == "4x4") {
      if (!this.getInput("COLS4")) {
        this.appendDummyInput("COLS4")
          .appendField("Col4:")
          .appendField(
            new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
            "COLS4"
          );
      }
    } else {
      if (this.getInput("COLS4")) {
        this.removeInput("COLS4");
      }
    }
  },

  /**
   * Checks for pin conflicts with other blocks and sets a warning if any are found.
   * Also checks for local duplicate pin assignments within the block.
   */
  checkPinConflicts_: function () {
    var warnings = [];
    var currentPins = this.getCurrentPins_();

    // Check against all blocks in the workspace
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.id !== this.id) {
        if (block.type === "keypad_setup") {
          // Check conflicts with other instances of keypad_setup
          var otherPins = block.getCurrentPins_();
          var conflicts = currentPins.filter((pin) => otherPins.includes(pin));
          if (conflicts.length > 0) {
            warnings.push("Pin conflicts between multiple keypad setups.");
          }
        } else if (
          block.type === "io_digitalwrite" ||
          block.type === "io_digitalread"
        ) {
          // Check conflicts with io_digitalwrite and io_digitalread blocks
          var pin = block.getFieldValue("PIN");
          if (currentPins.includes(pin)) {
            warnings.push(
              "Pin " + pin + " is used both in keypad and another block."
            );
          }
        }
      }
    });

    // Check for local duplicates within the block
    var duplicates = currentPins.filter((item, index) => currentPins.indexOf(item) != index);
    if (duplicates.length > 0) {
      warnings.push("Duplicate pin assignments detected within the block!");
    }

    if (warnings.length > 0) {
      this.setWarningText(warnings.join("\n"));
    } else {
      this.setWarningText(null);
    }
  },

  /**
   * Retrieves the current pin assignments of this keypad_setup block.
   */
  getCurrentPins_: function () {
    var pins = [
      this.getFieldValue("ROWS1"),
      this.getFieldValue("ROWS2"),
      this.getFieldValue("ROWS3"),
      this.getFieldValue("ROWS4"),
      this.getFieldValue("COLS1"),
      this.getFieldValue("COLS2"),
      this.getFieldValue("COLS3"),
      this.getFieldValue("COLS4")
    ];
    if (this.size == "4x4") {
      pins.push(this.getFieldValue("COLS4"));
    }
    return pins;
  },

  /**
   * Handle onchange event to check for pin conflicts and local duplicates.
   */
  onchange: function () {
    this.checkPinConflicts_();
  }
};

Blockly.Blocks["keypad_get_key"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Get Key from Keypad#")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );
    this.setOutput(true, "String");
    this.setColour(Blockly.Blocks.keypad.HUE);
    this.setTooltip(Blockly.Msg.ARD_KEYPAD_GET_KEY_TIP);

    // Initialize the warning to null
    this.setWarningText(null);

    // Call onchange to initialize warnings and checks
    this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks if the init block for this keypad# has been dragged before using this block.
   */
  onchange: function () {
    var keypadId = this.getFieldValue("ID");
    this.checkInitBlockPresence_(keypadId);
  },

  /**
   * Checks if the init block for the specified keypad# has been dragged before using this block.
   * @param {string} keypadId - The ID of the keypad (e.g., "1", "2", etc.).
   */
  checkInitBlockPresence_: function (keypadId) {
    var warnings = [];

    // Check if there is an etkey_setup block with the same ID
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.type === "keypad_setup" && block.getFieldValue("ID") === keypadId) {
        initBlockExists = true;
      }
    });

    // If no init block is found, issue a warning
    if (!initBlockExists) {
      warnings.push("Initialize the Keypad#" + keypadId + " first using keypad setup block.");
    }

    // Set or clear warning text based on the presence of init block
    if (warnings.length > 0) {
      this.setWarningText(warnings.join("\n"));
    } else {
      this.setWarningText(null);
    }
  },

  /**
   * Returns the type of the output, which is a character.
   * @return {string} The type of the output.
   */
  getBlockType: function () {
    return Blockly.Types.CHARACTER;
  },
};
