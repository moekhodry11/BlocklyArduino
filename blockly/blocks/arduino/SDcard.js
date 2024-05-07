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
            .appendField("Setup SD Card");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.sdcard.HUE);
        this.setTooltip('Setup the SD Card');
        this.setHelpUrl('http://arduino.cc/en/Reference/SD');
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


