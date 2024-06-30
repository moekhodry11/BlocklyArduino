/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for the logic blocks.
 */
'use strict';

goog.provide('Blockly.Arduino.lcd');

goog.require('Blockly.Arduino');

/**
 * Code generator to create if/if else/else statement.
 * Arduino code: loop { if (X)/else if ()/else { X } }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */


Blockly.Arduino['lcd_begin'] = function(block) {
  var id = block.getFieldValue('ID');
  var lcdtype = block.getFieldValue('LCDTYPE');
  var lcdsize = block.getFieldValue('LCDSIZE');
  if (lcdsize === '16x2') {
      lcdsize = '16, 2';
  } else if (lcdsize === '16x4') {
      lcdsize = '16, 4';
  }
  else if (lcdsize === '20x4') {
      lcdsize = '20, 4';
  }
      
  var rs, en, d4, d5, d6, d7;

  if (lcdtype === 'standard') {
      rs = block.getFieldValue('RS');
      en = block.getFieldValue('EN');
      d4 = block.getFieldValue('D4');
      d5 = block.getFieldValue('D5');
      d6 = block.getFieldValue('D6');
      d7 = block.getFieldValue('D7');
      Blockly.Arduino.reservePin(
        block, rs, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');
        Blockly.Arduino.reservePin(
          block, en, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');
          Blockly.Arduino.reservePin(
            block, d4, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');
            Blockly.Arduino.reservePin(
              block, d5, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');
              Blockly.Arduino.reservePin(
                block, d6, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');
                Blockly.Arduino.reservePin(
                  block, d7, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');

      
      Blockly.Arduino.addInclude('lcd', '#include <LiquidCrystal.h>');
      Blockly.Arduino.addDeclaration('lcd_' + id, 'LiquidCrystal lcd_' + id + '(' + rs + ',' + en + ',' + d4 + ',' + d5 + ',' + d6 + ',' + d7 + ');');
      Blockly.Arduino.addSetup('lcd_' + id, 'lcd_' + id + '.begin(' + lcdsize + ');', false);
  } else if (lcdtype === 'i2c') {
      var i2cAddress = block.getFieldValue('I2C_ADDRESS');
      
      Blockly.Arduino.addInclude('wire', '#include <Wire.h>');
      Blockly.Arduino.addInclude('i2c', '#include <LiquidCrystal_I2C.h>');
      Blockly.Arduino.addDeclaration('lcd_' + id, 'LiquidCrystal_I2C lcd_' + id + '(' + i2cAddress + ',' + lcdsize + ');');
      Blockly.Arduino.setups_['setup_lcd_' + id] = 'lcd_' + id + '.init();\nlcd_' + id + '.backlight();';
  }

  return '';
};



Blockly.Arduino['lcd_print'] = function(block) {
  var id = block.getFieldValue('ID');
  var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'lcd_'+id+'.print('+text+');\n';
  return code;
}

Blockly.Arduino['lcd_set_cursor'] = function(block) {
  var id = block.getFieldValue('ID');
  var col = Blockly.Arduino.valueToCode(block, 'COL', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var row = Blockly.Arduino.valueToCode(block, 'ROW', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'lcd_'+id+'.setCursor('+col+','+row+');\n';
  return code;
}


Blockly.Arduino['lcd_clear'] = function(block) {
  var id = block.getFieldValue('ID');
  var code = 'lcd_'+id+'.clear();\n';
  return code;
}
