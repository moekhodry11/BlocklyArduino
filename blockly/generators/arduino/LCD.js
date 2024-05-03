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

    Blockly.Arduino.addInclude('lcd', '#include <LiquidCrystal.h>');

  var rs = block.getFieldValue('RS');
  var en = block.getFieldValue('EN');
  var d4 = block.getFieldValue('D4');
  var d5 = block.getFieldValue('D5');
  var d6 = block.getFieldValue('D6');
  var d7 = block.getFieldValue('D7');

  Blockly.Arduino.addDeclaration('lcd', 'LiquidCrystal lcd('+rs+','+en+','+d4+','+d5+','+d6+','+d7+');');

  Blockly.Arduino.addSetup('lcd', 'lcd.begin(16, 2);', true);
  
    var code = '';
  return code;
}

Blockly.Arduino['lcd_print'] = function(block) {
  var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'lcd.print('+text+');\n';
  return code;
}

Blockly.Arduino['lcd_set_cursor'] = function(block) {
  var col = Blockly.Arduino.valueToCode(block, 'COL', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var row = Blockly.Arduino.valueToCode(block, 'ROW', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'lcd.setCursor('+col+','+row+');\n';
  return code;
}


Blockly.Arduino['lcd_clear'] = function(block) {
  var code = 'lcd.clear();\n';
  return code;
}