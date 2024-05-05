'use strict';

goog.provide('Blockly.Blocks.keypad');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.keypad.HUE = 250;

Blockly.Blocks['keypad_setup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Setup Keypad 4x4")
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

Blockly.Blocks['keypad_setup_3_3'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Setup Keypad 3x3")
            .appendField("Rows")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'ROWS1')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'ROWS2')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'ROWS3');
        this.appendDummyInput()
            .appendField("Cols")
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'COLS1')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'COLS2')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'COLS3');
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