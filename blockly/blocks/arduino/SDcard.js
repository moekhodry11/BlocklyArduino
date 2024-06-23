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
  
      // Call onchange to initialize warnings and pin updates
      this.onchange();
    },
  
    /**
     * Called whenever the block's fields change.
     * Checks for pin conflicts with other blocks and local duplicate pin assignments within the block.
     */
    onchange: function() {
      var csPin = this.getFieldValue("CS");
      this.checkPinConflictsAndUpdatePins_(csPin);
    },
  
    /**
     * Checks for pin conflicts with other blocks and sets a warning if any are found.
     * Updates the pin fields.
     * @param {string} csPin - The selected CS pin.
     */
    checkPinConflictsAndUpdatePins_: function(csPin) {
      var warnings = [];
  
      // Check against all blocks in the workspace for conflicts
      var blocks = Blockly.getMainWorkspace().getAllBlocks();
      blocks.forEach((block) => {
        if (block.id !== this.id) {
          if (block.type === "sdcard_setup") {
            // Check conflicts with other instances of sdcard_setup
            var otherCsPin = block.getFieldValue("CS");
            if (csPin === otherCsPin) {
              warnings.push("Pin conflict with another SD Card setup block!");
            }
          } else if (block.type === "sdcard_write" || block.type === "sdcard_read") {
            // Check conflicts with sdcard_write and sdcard_read blocks
            var pin = block.getFieldValue("CS");
            if (csPin === pin) {
              warnings.push("Pin " + csPin + " is used in another SD Card block.");
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
    },
  };
  


Blockly.Blocks['sdcard_open'] = {
    init: function() {
        this.appendValueInput("FILENAME")
            .setCheck(Blockly.Types.TEXT.checkList)
            .appendField("Open file");
        this.appendDummyInput()
            .appendField("Mode")
            .appendField(new Blockly.FieldDropdown([["READ", "READ"], ["WRITE", "WRITE"]]), "MODE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.sdcard.HUE);
        this.setTooltip('Open a file on the SD Card');
        this.setHelpUrl('http://arduino.cc/en/Reference/SD');
    }
    };


Blockly.Blocks['sdcard_write'] = {
    init: function() {
        this.appendValueInput("DATA")
            .setCheck(Blockly.Types.TEXT.checkList)
            .appendField("Write to file");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.sdcard.HUE);
        this.setTooltip('Write to a file on the SD Card');
        this.setHelpUrl('http://arduino.cc/en/Reference/SD');
    }
    };


Blockly.Blocks['sdcard_read'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Read from file");
        this.setOutput(true, Blockly.Types.TEXT.output);
        this.setColour(Blockly.Blocks.sdcard.HUE);
        this.setTooltip('Read from a file on the SD Card');
        this.setHelpUrl('http://arduino.cc/en/Reference/SD');
    }
    };





Blockly.Blocks['sdcard_close'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Close file");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.sdcard.HUE);
        this.setTooltip('Close a file on the SD Card');
        this.setHelpUrl('http://arduino.cc/en/Reference/SD');
    }
    };


