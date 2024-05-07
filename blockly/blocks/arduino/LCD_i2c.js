"use strict";
goog.provide("Blockly.Blocks.LCD_i2c.js");
goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.LCD_i2c.HUE = 230;



Blockly.Blocks["LCD_i2c_setup"] = {

  init: function() {
    this.appendDummyInput()
        .appendField("Setup LCD I2C");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.LCD_i2c.HUE);
    this.setTooltip("Setup LCD I2C");
    this.setHelpUrl("");
  }


};



Blockly.Blocks['LCD_i2c_print'] = {
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

Blockly.Blocks['LCD_i2c_set_cursor'] = {
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

Blockly.Blocks['LCD_i2c_clear'] = {
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