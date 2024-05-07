"use strict";
goog.provide("Blockly.Arduino.LCD_i2c.js");
goog.require("Blockly.Arduino");

Blockly.Arduino.LCD_i2c_setup = function () {

  Blockly.Arduino.definitions_['define_wire_h'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_lcd_h'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['define_lcd'] = 'LiquidCrystal_I2C lcd(0x27, 16, 2);';

  var setupCode = 'lcd.init();\n  lcd.backlight();';
  Blockly.Arduino.setups_['setup_lcd'] = setupCode;

  return "";
}


Blockly.Arduino['LCD_i2c_print'] = function(block) {
  var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'lcd.print('+text+');\n';
  return code;
}

Blockly.Arduino['LCD_i2c_set_cursor'] = function(block) {
  var col = Blockly.Arduino.valueToCode(block, 'COL', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var row = Blockly.Arduino.valueToCode(block, 'ROW', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'lcd.setCursor('+col+','+row+');\n';
  return code;
}


Blockly.Arduino['LCD_i2c_clear'] = function(block) {
  var code = 'lcd.clear();\n';
  return code;
}