"use strict";

goog.provide("Blockly.Blocks.oled");

goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.oled.HUE = 120;
Blockly.Blocks["oled_i2c_begin"] = {
  init: function () {
    this.setHelpUrl("https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/10-the-oled-screen");
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.ARD_OLED_I2C_BEGIN)
      .appendField("Set I2C OLED On")
      .appendField("OLED #")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      )
      .appendField("Width")
      .appendField(new Blockly.FieldDropdown([["128"], ["256"]]), "WIDTH")
      .appendField("Height")
      .appendField(new Blockly.FieldDropdown([["64"], ["128"]]), "HEIGHT")
      .appendField("Address")
      .appendField(
        new Blockly.FieldDropdown([["0x3C"], ["0x3D"], ["0x3E"], ["0x3F"]]),
        "ADDRESS"
      );

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_OLED_I2C_BEGIN_TIP);

    // Initialize the warning to null
    this.setWarningText(null);

    // Initialize debounce timer
    this.debounceTimer_ = null;

    // Call onchange to initialize warnings
    this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for the presence of another oled_i2c_begin block with the same address and sets a warning if found.
   */
  onchange: function () {
    // Use debounce to delay warning update after block placement
    if (this.debounceTimer_) {
      clearTimeout(this.debounceTimer_);
    }
    this.debounceTimer_ = setTimeout(() => {
      this.checkDuplicateAddress_();
    }, 200); // Adjust delay time as needed (200ms in this example)
  },

  /**
   * Checks if there is another oled_i2c_begin block with the same address in the workspace.
   * Sets a warning if a duplicate address is found.
   */
  checkDuplicateAddress_: function () {
    var address = this.getFieldValue("ADDRESS");
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    var duplicateExists = false;
    
    blocks.forEach((block) => {
      if (block.type === "oled_i2c_begin" && block.id !== this.id && block.getFieldValue("ADDRESS") === address) {
        duplicateExists = true;
      }
    });

    // If a duplicate address is found, issue a warning
    if (duplicateExists) {
      this.setWarningText('Another OLED display is already using this I2C address.');
    } else {
      this.setWarningText(null);
    }
  }
};


Blockly.Blocks["oled_print_text"] = {
  init: function () {
    this.setHelpUrl("https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/10-the-oled-screen");
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendValueInput("TEXT")
      .appendField("Print to OLED")
      .appendField(Blockly.Msg.ARD_OLED_PRINT_TEXT)
      .setCheck(Blockly.Types.TEXT.checkList);
    this.appendDummyInput()
      .appendField("OLED #")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );

   // this.setCommentText("oled_print_text");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_OLED_PRINT_TEXT_TIP);

    // Initialize the warning to null
    this.setWarningText(null);

    // Initialize debounce timer
    this.debounceTimer_ = null;

    // Call onchange to initialize warnings
    this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for the presence of an oled_i2c_begin block and sets a warning if it is not found.
   */
  onchange: function () {
    // Use debounce to delay warning update after block placement
    if (this.debounceTimer_) {
      clearTimeout(this.debounceTimer_);
    }
    this.debounceTimer_ = setTimeout(() => {
      this.checkInitBlockPresence_();
    }, 200); // Adjust delay time as needed (200ms in this example)
  },

  /**
   * Checks if the oled_i2c_begin block is present in the workspace.
   * Sets a warning if the oled_i2c_begin block is not found.
   */
  checkInitBlockPresence_: function () {
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.type === "oled_i2c_begin") {
        initBlockExists = true;
      }
    });

    // If no init block is found, issue a warning
    if (!initBlockExists) {
      this.setWarningText('Initialize the OLED display first using the oled_i2c_begin block.');
    } else {
      this.setWarningText(null);
    }
  }
};



Blockly.Blocks['oled_set_cursor'] = {
  init: function() {
    this.setHelpUrl('https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/10-the-oled-screen');
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendValueInput("COL")
      .appendField("Set Cursor")
      .appendField("Col")
      .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendValueInput("ROW")
      .appendField("Row")
      .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput()
      .appendField("on OLED #")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );
    //  this.setCommentText("oled_set_cursor");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_OLED_SET_CURSOR_TIP);

    // Initialize the warning to null
    this.setWarningText(null);

    // Initialize debounce timer
    this.debounceTimer_ = null;

    // Call onchange to initialize warnings
    this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for the presence of an oled_i2c_begin block and sets a warning if it is not found.
   */
  onchange: function() {
    // Use debounce to delay warning update after block placement
    if (this.debounceTimer_) {
      clearTimeout(this.debounceTimer_);
    }
    this.debounceTimer_ = setTimeout(() => {
      this.checkInitBlockPresence_();
    }, 200); // Adjust delay time as needed (200ms in this example)
  },

  /**
   * Checks if the oled_i2c_begin block is present in the workspace.
   * Sets a warning if the oled_i2c_begin block is not found.
   */
  checkInitBlockPresence_: function() {
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.type === "oled_i2c_begin") {
        initBlockExists = true;
      }
    });

    // If no init block is found, issue a warning
    if (!initBlockExists) {
      this.setWarningText('Initialize the OLED display first using the oled_i2c_begin block.');
    } else {
      this.setWarningText(null);
    }
  }
};



Blockly.Blocks['oled_clear'] = {
  init: function() {
    this.setHelpUrl('https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/10-the-oled-screen');
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField("Clear OLED #")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );
    // this.setCommentText("oled_clear");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_OLED_CLEAR_TIP);

    // Initialize the warning to null
    this.setWarningText(null);

    // Initialize debounce timer
    this.debounceTimer_ = null;

    // Call onchange to initialize warnings
    this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for the presence of an oled_i2c_begin block and sets a warning if it is not found.
   */
  onchange: function() {
    // Use debounce to delay warning update after block placement
    if (this.debounceTimer_) {
      clearTimeout(this.debounceTimer_);
    }
    this.debounceTimer_ = setTimeout(() => {
      this.checkInitBlockPresence_();
    }, 200); // Adjust delay time as needed (200ms in this example)
  },

  /**
   * Checks if the oled_i2c_begin block is present in the workspace.
   * Sets a warning if the oled_i2c_begin block is not found.
   */
  checkInitBlockPresence_: function() {
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.type === "oled_i2c_begin") {
        initBlockExists = true;
      }
    });

    // If no init block is found, issue a warning
    if (!initBlockExists) {
      this.setWarningText('Initialize the OLED display first using the oled_i2c_begin block.');
    } else {
      this.setWarningText(null);
    }
  }
};



Blockly.Blocks['oled_set_text_size'] = {
  init: function() {
    this.setHelpUrl('https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/10-the-oled-screen');
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField("Set text size")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "SIZE"
      )
      .appendField("on OLED #")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );
    // this.setCommentText("oled_set_text_size");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_OLED_SET_TEXT_SIZE_TIP);

    // Initialize the warning to null
    this.setWarningText(null);

    // Initialize debounce timer
    this.debounceTimer_ = null;

    // Call onchange to initialize warnings
    this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for the presence of an oled_i2c_begin block and sets a warning if it is not found.
   */
  onchange: function() {
    // Use debounce to delay warning update after block placement
    if (this.debounceTimer_) {
      clearTimeout(this.debounceTimer_);
    }
    this.debounceTimer_ = setTimeout(() => {
      this.checkInitBlockPresence_();
    }, 200); // Adjust delay time as needed (200ms in this example)
  },

  /**
   * Checks if the oled_i2c_begin block is present in the workspace.
   * Sets a warning if the oled_i2c_begin block is not found.
   */
  checkInitBlockPresence_: function() {
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.type === "oled_i2c_begin") {
        initBlockExists = true;
      }
    });

    // If no init block is found, issue a warning
    if (!initBlockExists) {
      this.setWarningText('Initialize the OLED display first using the oled_i2c_begin block.');
    } else {
      this.setWarningText(null);
    }
  }
};


Blockly.Blocks['oled_set_text_color'] = {
  init: function() {
    this.setHelpUrl('https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/10-the-oled-screen');
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField("Set text color")
      .appendField(
        new Blockly.FieldDropdown([["White"], ["Black"], ["Invert"]]),
        "COLOR"
      )
      .appendField("on OLED #")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );
      // this.setCommentText("oled_set_text_color");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_OLED_SET_TEXT_COLOR_TIP);

    // Initialize the warning to null
    this.setWarningText(null);

    // Initialize debounce timer
    this.debounceTimer_ = null;

    // Call onchange to initialize warnings
    this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for the presence of an oled_i2c_begin block and sets a warning if it is not found.
   */
  onchange: function() {
    // Use debounce to delay warning update after block placement
    if (this.debounceTimer_) {
      clearTimeout(this.debounceTimer_);
    }
    this.debounceTimer_ = setTimeout(() => {
      this.checkInitBlockPresence_();
    }, 200); // Adjust delay time as needed (200ms in this example)
  },

  /**
   * Checks if the oled_i2c_begin block is present in the workspace.
   * Sets a warning if the oled_i2c_begin block is not found.
   */
  checkInitBlockPresence_: function() {
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.type === "oled_i2c_begin") {
        initBlockExists = true;
      }
    });

    // If no init block is found, issue a warning
    if (!initBlockExists) {
      this.setWarningText('Initialize the OLED display first using the oled_i2c_begin block.');
    } else {
      this.setWarningText(null);
    }
  }
};

Blockly.Blocks['oled_draw_pixel'] = {
  init: function() {
    this.setHelpUrl('https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/10-the-oled-screen');
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendValueInput("X")
    .appendField("Draw Pixel at")
    .appendField("X")
    .setCheck(Blockly.Types.NUMBER.checkList);
  this.appendValueInput("Y")
    .appendField("Y")
    .setCheck(Blockly.Types.NUMBER.checkList);
  this.appendDummyInput()
      .appendField("Color:")
      .appendField(
        new Blockly.FieldDropdown([["White"], ["Black"], ["Invert"]]),
        "COLOR"
      )
      .appendField("on OLED #")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );
      // this.setCommentText("oled_draw_pixel");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_OLED_DRAW_PIXEL_TIP);

    // Initialize the warning to null
    this.setWarningText(null);

    // Initialize debounce timer
    this.debounceTimer_ = null;

    // Call onchange to initialize warnings
    this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for the presence of an oled_i2c_begin block and sets a warning if it is not found.
   */
  onchange: function() {
    // Use debounce to delay warning update after block placement
    if (this.debounceTimer_) {
      clearTimeout(this.debounceTimer_);
    }
    this.debounceTimer_ = setTimeout(() => {
      this.checkInitBlockPresence_();
    }, 200); // Adjust delay time as needed (200ms in this example)
  },

  /**
   * Checks if the oled_i2c_begin block is present in the workspace.
   * Sets a warning if the oled_i2c_begin block is not found.
   */
  checkInitBlockPresence_: function() {
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.type === "oled_i2c_begin") {
        initBlockExists = true;
      }
    });

    // If no init block is found, issue a warning
    if (!initBlockExists) {
      this.setWarningText('Initialize the OLED display first using the oled_i2c_begin block.');
    } else {
      this.setWarningText(null);
    }
  }
};
