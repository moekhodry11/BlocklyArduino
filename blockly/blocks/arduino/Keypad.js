"use strict";

goog.provide("Blockly.Blocks.keypad");

goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.keypad.HUE = 0;
Blockly.Blocks["keypad_setup"] = {
  init: function () {
    this.setHelpUrl("https://www.arduino.cc/reference/en/libraries/keypad/");
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
      )
      ;

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.keypad.HUE);
    this.setTooltip(Blockly.Msg.ARD_KEYPAD_SETUP_TIP);
    this.size = "4x3";
    this.setFieldValue("4x3", "KEYPAD_TYPE");

    // Initialize with the default size
    this.updateCols_("4x3");

    // Mutation methods
    this.mutationToDom = function () {
      var container = document.createElement('mutation');
      container.setAttribute('keypad_type', this.getFieldValue('KEYPAD_TYPE'));
      return container;
    };

    this.domToMutation = function (xmlElement) {
      var keypadType = xmlElement.getAttribute('keypad_type');
      this.updateCols_(keypadType);
      this.setFieldValue(keypadType, 'KEYPAD_TYPE');
    };

    // Check for duplicates when initialized
    this.checkDuplicateBlock();
  },

  // Check for duplicates when modified
  onchange: function () {
    this.checkDuplicateBlock();
  },

  checkDuplicateBlock: function () {
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    var duplicateExists = false;
    var thisBlock = this;
    var thisID = this.getFieldValue("ID");
    var thisROWS1 = this.getFieldValue("ROWS1");
    var thisROWS2 = this.getFieldValue("ROWS2");
    var thisROWS3 = this.getFieldValue("ROWS3");
    var thisROWS4 = this.getFieldValue("ROWS4");
    var thisCOLS1 = this.getFieldValue("COLS1");
    var thisCOLS2 = this.getFieldValue("COLS2");
    var thisCOLS3 = this.getFieldValue("COLS3");

    blocks.forEach(function (block) {
      if (block.type === thisBlock.type && block.id !== thisBlock.id) {
        var blockID = block.getFieldValue("ID");
        var blockROWS1 = block.getFieldValue("ROWS1");
        var blockROWS2 = block.getFieldValue("ROWS2");
        var blockROWS3 = block.getFieldValue("ROWS3");
        var blockROWS4 = block.getFieldValue("ROWS4");
        var blockCOLS1 = block.getFieldValue("COLS1");
        var blockCOLS2 = block.getFieldValue("COLS2");
        var blockCOLS3 = block.getFieldValue("COLS3");

        // Check if all fields match
        if (
          blockID === thisID &&
          blockROWS1 === thisROWS1 &&
          blockROWS2 === thisROWS2 &&
          blockROWS3 === thisROWS3 &&
          blockROWS4 === thisROWS4 &&
          blockCOLS1 === thisCOLS1 &&
          blockCOLS2 === thisCOLS2 &&
          blockCOLS3 === thisCOLS3
        ) {
          duplicateExists = true;
        }
      }
    });

    if (duplicateExists) {
      this.setWarningText("Duplicate Keypad setup with the same configuration.");
    } else {
      this.setWarningText(null);
    }
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
  }
};



Blockly.Blocks["keypad_get_key"] = {
  init: function () {
    this.setHelpUrl("https://www.arduino.cc/reference/en/libraries/usbhost/getkey/");
    this.appendDummyInput()
      .appendField("Get Key from Keypad#")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );
    this.setCommentText("keypad_get_key");
    this.setOutput(true, "String");
    this.setColour(Blockly.Blocks.keypad.HUE);
    this.setTooltip(Blockly.Msg.ARD_KEYPAD_GET_KEY_TIP);

    // Initialize the warning to null
    this.setWarningText(null);

    // Call onchange to initialize warnings and checks
    Blockly.getMainWorkspace().addChangeListener(this.workspaceChange.bind(this));  
  },

  /**
   * Called whenever the block's fields change.
   * Checks if the init block for this keypad# has been dragged before using this block.
   */
  workspaceChange: function () {
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
