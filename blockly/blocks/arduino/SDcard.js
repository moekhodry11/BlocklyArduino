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
'use strict';

goog.provide('Blockly.Blocks.sdcard');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


Blockly.Blocks.sdcard.HUE = 70;
Blockly.Blocks['sdcard_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Setup SD Card")
        .appendField("CS")
        .appendField(new Blockly.FieldDropdown(
          Blockly.Arduino.Boards.selected.digitalPins.filter(function(pin) {
            return pin[0] != 10 && pin[0] != 11 && pin[0] != 12 && pin[0] != 13;
          })
        ), "CS");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sdcard.HUE);
    this.setTooltip('Setup the SD Card');
    this.setHelpUrl('http://arduino.cc/en/Reference/SD');

    // Check for duplicate blocks when initialized
    this.checkDuplicateBlock();
  },

  // Check for duplicate blocks when modified
  onchange: function () {
    this.checkDuplicateBlock();
  },

  checkDuplicateBlock: function () {
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    var sdCardSetupCount = 0;
    var thisBlock = this;

    blocks.forEach(function (block) {
      if (block.type === thisBlock.type && block.id !== thisBlock.id) {
        sdCardSetupCount++;
      }
    });

    if (sdCardSetupCount > 0) {
      this.setWarningText("Only one SD Card setup block allowed.");
    } else {
      this.setWarningText(null);
    }
  }
};



Blockly.Blocks['sdcard_open'] = {
  init: function() {
    this.appendValueInput("FILENAME")
        .setCheck(Blockly.Types.TEXT.checkList)
        .appendField("Open file");
    this.appendDummyInput()
        .appendField("Mode")
        .appendField(new Blockly.FieldDropdown([["READ", "READ"], ["WRITE", "WRITE"]]), "MODE");
        // this.setCommentText("sdcard_open");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sdcard.HUE);
    this.setTooltip('Open a file on the SD Card');
    this.setHelpUrl('http://arduino.cc/en/Reference/SD');

    // Call onchange to initialize warnings
    this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for the presence of an sdcard_setup block and sets a warning if it is not found.
   */
  onchange: function() {
    this.checkInitBlockPresence_();
  },

  /**
   * Checks if the sdcard_setup block is present in the workspace.
   * Sets a warning if the sdcard_setup block is not found.
   */
  checkInitBlockPresence_: function() {
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.type === 'sdcard_setup') {
        initBlockExists = true;
      }
    });

    // If no setup block is found, issue a warning
    if (!initBlockExists) {
      this.setWarningText('Initialize the SD Card first using the sdcard_setup block.');
    } else {
      this.setWarningText(null);
    }
  }
};




Blockly.Blocks['sdcard_write'] = {
  init: function() {
    this.appendValueInput("DATA")
        .setCheck(Blockly.Types.TEXT.checkList)
        .appendField("Write to file");
        // this.setCommentText("sdcard_write");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sdcard.HUE);
    this.setTooltip('Write to a file on the SD Card');
    this.setHelpUrl('http://arduino.cc/en/Reference/SD');

    // Call onchange to initialize warnings
   // Call onchange to initialize warnings
   this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for the presence of an sdcard_setup block and sets a warning if it is not found.
   */
  onchange: function() {
    this.checkInitBlockPresence_();
  },

  /**
   * Checks if the sdcard_setup block is present in the workspace.
   * Sets a warning if the sdcard_setup block is not found.
   */
  checkInitBlockPresence_: function() {
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.type === 'sdcard_setup') {
        initBlockExists = true;
      }
    });

    // If no setup block is found, issue a warning
    if (!initBlockExists) {
      this.setWarningText('Initialize the SD Card first using the sdcard_setup block.');
    } else {
      this.setWarningText(null);
    }
  }
};

Blockly.Blocks['sdcard_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Read from file");
        // this.setCommentText("sdcard_read");
    this.setOutput(true, Blockly.Types.TEXT.output);
    this.setColour(Blockly.Blocks.sdcard.HUE);
    this.setTooltip('Read from a file on the SD Card');
    this.setHelpUrl('http://arduino.cc/en/Reference/SD');

    // Call onchange to initialize warnings
   // Call onchange to initialize warnings
   this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for the presence of an sdcard_setup block and sets a warning if it is not found.
   */
  onchange: function() {
    this.checkInitBlockPresence_();
  },

  /**
   * Checks if the sdcard_setup block is present in the workspace.
   * Sets a warning if the sdcard_setup block is not found.
   */
  checkInitBlockPresence_: function() {
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.type === 'sdcard_setup') {
        initBlockExists = true;
      }
    });

    // If no setup block is found, issue a warning
    if (!initBlockExists) {
      this.setWarningText('Initialize the SD Card first using the sdcard_setup block.');
    } else {
      this.setWarningText(null);
    }
  }
};




Blockly.Blocks['sdcard_close'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Close file");
        // this.setCommentText("sdcard_close");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.sdcard.HUE);
    this.setTooltip('Close a file on the SD Card');
    this.setHelpUrl('http://arduino.cc/en/Reference/SD');

    // Call onchange to initialize warnings
   // Call onchange to initialize warnings
   this.onchange();
  },

  /**
   * Called whenever the block's fields change.
   * Checks for the presence of an sdcard_setup block and sets a warning if it is not found.
   */
  onchange: function() {
    this.checkInitBlockPresence_();
  },

  /**
   * Checks if the sdcard_setup block is present in the workspace.
   * Sets a warning if the sdcard_setup block is not found.
   */
  checkInitBlockPresence_: function() {
    var initBlockExists = false;
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    blocks.forEach((block) => {
      if (block.type === 'sdcard_setup') {
        initBlockExists = true;
      }
    });

    // If no setup block is found, issue a warning
    if (!initBlockExists) {
      this.setWarningText('Initialize the SD Card first using the sdcard_setup block.');
    } else {
      this.setWarningText(null);
    }
  }
};