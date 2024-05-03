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

goog.provide('Blockly.Blocks.keypad');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.keypad.HUE = 250;

Blockly.Blocks['keypad_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Setup Keypad")
            .appendField("Rows")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'ROWS1')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'ROWS2')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'ROWS3')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'ROWS4');
        this.appendDummyInput()
            .appendField("Cols")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'COLS1')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'COLS2')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'COLS3')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'COLS4');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.keypad.HUE);
        this.setTooltip('Setup the Keypad');
        this.setHelpUrl('http://arduino.cc/en/Reference/Keypad');
    }
    };


Blockly.Blocks['keypad_get_key'] = {

    init: function() {
        this.appendDummyInput()
            .appendField("Get Key");
            
        this.setOutput(true, Blockly.Types.TEXT.output);
        this.setColour(Blockly.Blocks.keypad.HUE);
        this.setTooltip('Get the key pressed on the Keypad');
        this.setHelpUrl('http://arduino.cc/en/Reference/KeypadGetKey');
    },
    
  getBlockType: function () {
    return Blockly.Types.CHARACTER;
  }


    };