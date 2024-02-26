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

goog.provide('Blockly.Blocks.lcd');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.lcd.HUE = 250;

Blockly.Blocks['lcd_begin'] = {
    /**
     * Block for creating a lcd.begin() function.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl('http://arduino.cc/en/Reference/LiquidCrystalBegin');
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ARD_LCD_BEGIN)
            .appendField('Set LCD On')
            .appendField('RS')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'RS')
            .appendField('EN')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'EN')
            .appendField('D4')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'D4')
            .appendField('D5')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'D5')
            .appendField('D6')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'D6')
            .appendField('D7')
            .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.digitalPins), 'D7')
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.ARD_LCD_BEGIN_TIP);
    }
    };

    

Blockly.Blocks['lcd_print'] = {
    /**
     * Block for creating a lcd.print() function.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl('http://arduino.cc/en/Reference/LiquidCrystalPrint');
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendValueInput('TEXT')
        .appendField('Print On LCD')
            .appendField(Blockly.Msg.ARD_LCD_PRINT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.ARD_LCD_PRINT_TIP);
    }
};

Blockly.Blocks['lcd_set_cursor'] = {
    /**
     * Block for creating a lcd.setCursor() function.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl('http://arduino.cc/en/Reference/LiquidCrystalSetCursor');
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendValueInput('COL')
            .appendField('Set Cursor')
            .appendField(Blockly.Msg.ARD_LCD_SET_CURSOR);
        this.appendValueInput('ROW')
            .appendField(Blockly.Msg.ARD_LCD_SET_CURSOR_ROW);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.ARD_LCD_SET_CURSOR_TIP);
    }
};

Blockly.Blocks['lcd_clear'] = {
    /**
     * Block for creating a lcd.clear() function.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl('http://arduino.cc/en/Reference/LiquidCrystalClear');
        this.setColour(Blockly.Blocks.lcd.HUE);
        this.appendDummyInput()
            .appendField('Clear LCD')
            .appendField(Blockly.Msg.ARD_LCD_CLEAR);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.ARD_LCD_CLEAR_TIP);
    }
};