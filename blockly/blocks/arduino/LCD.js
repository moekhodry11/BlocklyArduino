/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Digital and Analogue input and output
 *     functions. The Arduino function syntax can be found at
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: maybe change this to a "PIN" BlocklyType
 */
"use strict";

goog.provide("Blockly.Blocks.lcd");

goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.lcd.HUE = 50;

Blockly.Blocks["lcd_begin"] = {
  /**
   * Block for creating an lcd.begin() function.
   * @this Blockly.Block
   */
  init: function () {
    this.setHelpUrl("http://arduino.cc/en/Reference/LiquidCrystalBegin");
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendDummyInput()
      .appendField("Set LCD On")
      .appendField("lcd#")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      )
      .appendField("lcd type")
      .appendField(
        new Blockly.FieldDropdown([["standard"], ["i2c"]]),
        "LCDTYPE",
        this.updateType_.bind(this)
      )
      .appendField("lcd size")
      .appendField(
        new Blockly.FieldDropdown([["16x2"], ["16x4"], ["20x4"]]),
        "LCDSIZE"
      );

    // Initialize standard pin inputs (visible by default)
    this.standardPinsInput_ = this.appendDummyInput()
      .appendField("RS")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "RS"
      )
      .appendField("EN")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "EN"
      )
      .appendField("D4")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "D4"
      )
      .appendField("D5")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "D5"
      )
      .appendField("D6")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "D6"
      )
      .appendField("D7")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "D7"
      );

    // Initialize I2C address input (hidden by default)
    this.i2cAddressInput_ = this.appendDummyInput()
      .appendField("I2C Address")
      .appendField(
        new Blockly.FieldDropdown([
          ["0x27"],
          ["0x3F"],
          ["0x20"],
          ["0x38"],
          ["0x3E"],
          ["0x62"],
          ["0x3C"],
          ["0x3D"],
        ]),
        "I2C_ADDRESS"
      );

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_LCD_BEGIN_TIP);

    // Initialize with the default type
    this.updateType_(this.getFieldValue("LCDTYPE"));
  },

  /**
   * Updates the inputs based on the selected LCD type.
   * @param {string} type - The selected LCD type ('standard' or 'i2c').
   */
  updateType_: function (type) {
    if (type === "standard") {
      this.standardPinsInput_.setVisible(true);
      this.i2cAddressInput_.setVisible(false);
    } else if (type === "i2c") {
      this.standardPinsInput_.setVisible(false);
      this.i2cAddressInput_.setVisible(true);
    }
    this.render();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for pin conflicts and updates inputs based on the selected LCD type.
   */
  onchange: function () {
    var warnings = [];

    this.updateType_(this.getFieldValue("LCDTYPE"));
    // Check for local duplicate pin assignments within the block
    var currentPins = this.getCurrentPins_();
    var duplicates = currentPins.filter(
      (item, index) => currentPins.indexOf(item) != index
    );
    if (duplicates.length > 0) {
      warnings.push("Duplicate pin assignments detected within the block!");
    }

    // Check against all blocks in the workspace for conflicts
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.id !== this.id) {
        if (block.type === "lcd_begin" || block.type === "keypad_setup") {
          // Check conflicts with other instances of LCD or keypad setups
          var otherPins = block.getCurrentPins_();
          var conflicts = currentPins.filter((pin) => otherPins.includes(pin));
          if (conflicts.length > 0) {
            warnings.push(
              "Pin conflicts with another LCD or keypad setup block."
            );
          }
        } else if (
          block.type === "io_digitalwrite" ||
          block.type === "io_digitalread"
        ) {
          // Check conflicts with io_digitalwrite and io_digitalread blocks
          var pin = block.getFieldValue("PIN");
          if (currentPins.includes(pin)) {
            warnings.push(
              "Pin " + pin + " is used both in LCD and another block."
            );
          }
        }
      }
    });

    if (warnings.length > 0) {
      this.setWarningText(warnings.join("\n"));
    } else {
      this.setWarningText(null);
    }
  },
  updateFields: function () {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, "RS", "digitalPins");
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, "EN", "digitalPins");
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, "D4", "digitalPins");
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, "D5", "digitalPins");
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, "D6", "digitalPins");
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, "D7", "digitalPins");
  },

  /**
   * Retrieves the current pin assignments of this LCD block.
   */
  getCurrentPins_: function () {
    var pins = [];
    var type = this.getFieldValue("LCDTYPE");
    if (type === "standard") {
      pins = [
        this.getFieldValue("RS"),
        this.getFieldValue("EN"),
        this.getFieldValue("D4"),
        this.getFieldValue("D5"),
        this.getFieldValue("D6"),
        this.getFieldValue("D7"),
      ];
    }
    return pins;
  },
};

Blockly.Blocks["lcd_print"] = {
  /**
   * Block for creating a lcd.print() function.
   * @this Blockly.Block
   */
  init: function () {
    this.setHelpUrl("http://arduino.cc/en/Reference/LiquidCrystalPrint");
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendValueInput("TEXT")
      .appendField("Print to LCD")
      .appendField(Blockly.Msg.ARD_LCD_PRINT);
    this.appendDummyInput()
      .appendField("lcd#")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );
    this.setCommentText("lcd_print");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_LCD_PRINT_TIP);

    // Initialize the warning to null
    this.setWarningText(null);

    // Call onchange to initialize warnings and checks
    Blockly.getMainWorkspace().addChangeListener(
      this.workspaceChange.bind(this)
    );
  },

  /**
   * Called whenever the block's fields change.
   * Checks if the init block for this lcd# has been dragged before using this block.
   */
  workspaceChange: function () {
    var lcdId = this.getFieldValue("ID");
    this.checkInitBlockPresence_(lcdId);
  },

  /**
   * Checks if the init block for the specified lcd# has been dragged before using this block.
   * @param {string} lcdId - The ID of the LCD (e.g., "1", "2", etc.).
   */
  checkInitBlockPresence_: function (lcdId) {
    var warnings = [];

    // Check if there is an lcd_setup block with the same ID
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.type === "lcd_begin" && block.getFieldValue("ID") === lcdId) {
        initBlockExists = true;
      }
    });

    // If no init block is found, issue a warning
    if (!initBlockExists) {
      warnings.push(
        "Initialize the LCD#" + lcdId + " first using lcd setup block."
      );
    }

    // Set or clear warning text based on the presence of init block
    if (warnings.length > 0) {
      this.setWarningText(warnings.join("\n"));
    } else {
      this.setWarningText(null);
    }
  },
};

Blockly.Blocks["lcd_set_cursor"] = {
  /**
   * Block for creating a lcd.setCursor() function.
   * @this Blockly.Block
   */
  init: function () {
    this.setHelpUrl("http://arduino.cc/en/Reference/LiquidCrystalSetCursor");
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendValueInput("COL")
      .appendField("Set Cursor")
      .appendField("Col")
      .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendValueInput("ROW")
      .appendField("Row")
      .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput()
      .appendField("lcd#")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );
    this.setCommentText("lcd_set_cursor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_LCD_SET_CURSOR_TIP);

    // Initialize the warning to null
    this.setWarningText(null);

    // Call onchange to initialize warnings and checks
    Blockly.getMainWorkspace().addChangeListener(
      this.workspaceChange.bind(this)
    );
  },

  /**
   * Called whenever the block's fields change.
   * Checks if the init block for this lcd# has been dragged before using this block.
   */
  workspaceChange: function () {
    var lcdId = this.getFieldValue("ID");
    this.checkInitBlockPresence_(lcdId);
  },

  /**
   * Checks if the init block for the specified lcd# has been dragged before using this block.
   * @param {string} lcdId - The ID of the LCD (e.g., "1", "2", etc.).
   */
  checkInitBlockPresence_: function (lcdId) {
    var warnings = [];

    // Check if there is an lcd_begin block with the same ID
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.type === "lcd_begin" && block.getFieldValue("ID") === lcdId) {
        initBlockExists = true;
      }
    });

    // If no init block is found, issue a warning
    if (!initBlockExists) {
      warnings.push(
        "Initialize the LCD#" + lcdId + " first using lcd setup block."
      );
    }

    // Set or clear warning text based on the presence of init block
    if (warnings.length > 0) {
      this.setWarningText(warnings.join("\n"));
    } else {
      this.setWarningText(null);
    }
  },
};
Blockly.Blocks["lcd_clear"] = {
  /**
   * Block for creating a lcd.clear() function.
   * @this Blockly.Block
   */
  init: function () {
    this.setHelpUrl("http://arduino.cc/en/Reference/LiquidCrystalClear");
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendDummyInput()
      .appendField("Clear LCD")
      .appendField("lcd#")
      .appendField(
        new Blockly.FieldDropdown([
          ["1", "1"],
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
        ]),
        "ID"
      );
    this.setCommentText("lcd_clear");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_LCD_CLEAR_TIP);

    // Initialize the warning to null
    this.setWarningText(null);

    // Call onchange to initialize warnings and checks
    Blockly.getMainWorkspace().addChangeListener(
      this.workspaceChange.bind(this)
    );
  },

  /**
   * Called whenever the block's fields change.
   * Checks if the init block for this lcd# has been dragged before using this block.
   */
  workspaceChange: function () {
    var lcdId = this.getFieldValue("ID");
    this.checkInitBlockPresence_(lcdId);
  },

  /**
   * Checks if the init block for the specified lcd# has been dragged before using this block.
   * @param {string} lcdId - The ID of the LCD (e.g., "1", "2", etc.).
   */
  checkInitBlockPresence_: function (lcdId) {
    var warnings = [];

    // Check if there is an lcd_begin block with the same ID
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.type === "lcd_begin" && block.getFieldValue("ID") === lcdId) {
        initBlockExists = true;
      }
    });

    // If no init block is found, issue a warning
    if (!initBlockExists) {
      warnings.push(
        "Initialize the LCD#" + lcdId + " first using lcd setup block."
      );
    }

    // Set or clear warning text based on the presence of init block
    if (warnings.length > 0) {
      this.setWarningText(warnings.join("\n"));
    } else {
      this.setWarningText(null);
    }
  },
};

//comment block
Blockly.Blocks["lcd_comment"] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldTextInput("comment"),
      "comment"
    );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);

    this.setTooltip("");
    this.setHelpUrl("");
  },
};
