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
  },

  updateCols_: function (size) {
    this.size = size;
    if (size == "4x4") {
      if (!this.getInput("COLS4")) {
        this.appendDummyInput("COLS4"); // Create dummy input if it doesn't exist
      }
      this.getInput("COLS4")
        .appendField("Col4:")
        .appendField(
          new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins
          ),
          "COLS4"
        );
    } else {
      if (this.getInput("COLS4")) {
        this.removeInput("COLS4");
      }
    }
  },
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
  },
};
