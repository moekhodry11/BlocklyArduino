'use strict';

goog.provide('Blockly.Arduino.keypad');

goog.require('Blockly.Arduino');

Blockly.Arduino['keypad_setup'] = function(block) {
    var rows1 = block.getFieldValue('ROWS1');
    var rows2 = block.getFieldValue('ROWS2');
    var rows3 = block.getFieldValue('ROWS3');
    var rows4 = block.getFieldValue('ROWS4');
    var cols1 = block.getFieldValue('COLS1');
    var cols2 = block.getFieldValue('COLS2');
    var cols3 = block.getFieldValue('COLS3');
    var cols4 = block.getFieldValue('COLS4');
    Blockly.Arduino.addInclude('keypad', '#include <Keypad.h>');
    Blockly.Arduino.addDeclaration('keypad', 'const byte ROWS = 4; //four rows\nconst byte COLS = 4; //four columns\nchar keys[ROWS][COLS] = {\n  {\'1\',\'2\',\'3\',\'A\'},\n  {\'4\',\'5\',\'6\',\'B\'},\n  {\'7\',\'8\',\'9\',\'C\'},\n  {\'*\',\'0\',\'#\',\'D\'}\n};\nbyte rowPins[ROWS] = {'+rows1+','+rows2+','+rows3+','+rows4+'}; //connect to the row pinouts of the keypad\nbyte colPins[COLS] = {'+cols1+','+cols2+','+cols3+','+cols4+'}; //connect to the column pinouts of the keypad\nKeypad keypad = Keypad( makeKeymap(keys), rowPins, colPins, ROWS, COLS );');
    var code = '';
    return code;
    }

Blockly.Arduino['keypad_setup_3_3'] = function(block) {
    var rows1 = block.getFieldValue('ROWS1');
    var rows2 = block.getFieldValue('ROWS2');
    var rows3 = block.getFieldValue('ROWS3');
    var cols1 = block.getFieldValue('COLS1');
    var cols2 = block.getFieldValue('COLS2');
    var cols3 = block.getFieldValue('COLS3');
    Blockly.Arduino.addInclude('keypad', '#include <Keypad.h>');
    Blockly.Arduino.addDeclaration('keypad', 'const byte ROWS = 3; //four rows\nconst byte COLS = 3; //four columns\nchar keys[ROWS][COLS] = {\n  {\'1\',\'2\',\'3\'},\n  {\'4\',\'5\',\'6\'},\n  {\'7\',\'8\',\'9\'}\n};\nbyte rowPins[ROWS] = {'+rows1+','+rows2+','+rows3+'}; //connect to the row pinouts of the keypad\nbyte colPins[COLS] = {'+cols1+','+cols2+','+cols3+'}; //connect to the column pinouts of the keypad\nKeypad keypad = Keypad( makeKeymap(keys), rowPins, colPins, ROWS, COLS );');
    var code = '';
    return code;
    }





Blockly.Arduino['keypad_get_key'] = function(block) {
    var code = 'keypad.getKey()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
