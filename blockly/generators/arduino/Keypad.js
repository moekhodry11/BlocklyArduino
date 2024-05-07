'use strict';

goog.provide('Blockly.Arduino.keypad');

goog.require('Blockly.Arduino');

Blockly.Arduino['keypad_setup'] = function(block) {
    var keypadType = block.getFieldValue('KEYPAD_TYPE');
    var rows1 = block.getFieldValue('ROWS1');
    var rows2 = block.getFieldValue('ROWS2');
    var rows3 = block.getFieldValue('ROWS3');
    var rows4 = block.getFieldValue('ROWS4');
    var cols1 = block.getFieldValue('COLS1');
    var cols2 = block.getFieldValue('COLS2');
    var cols3 = block.getFieldValue('COLS3');
    var cols4 = block.getFieldValue('COLS4');
    Blockly.Arduino.addInclude('keypad', '#include <Keypad.h>');
    if(keypadType == '4x4'){


        Blockly.Arduino.addDeclaration('keypad4*4', 'const byte ROWS = 4; //four rows\nconst byte COLS = 4; //four columns\nchar keys[ROWS][COLS] = {\n  {\'1\',\'2\',\'3\',\'A\'},\n  {\'4\',\'5\',\'6\',\'B\'},\n  {\'7\',\'8\',\'9\',\'C\'},\n  {\'*\',\'0\',\'#\',\'D\'}\n};\nbyte rowPins[ROWS] = {'+rows1+','+rows2+','+rows3+','+rows4+'}; //connect to the row pinouts of the keypad\nbyte colPins[COLS] = {'+cols1+','+cols2+','+cols3+','+cols4+'}; //connect to the column pinouts of the keypad\nKeypad keypad4x4 = Keypad( makeKeymap(keys), rowPins, colPins, ROWS, COLS );');
    }else{
        Blockly.Arduino.addDeclaration('keypad4*3', 'const byte ROWS = 4; //four rows\nconst byte COLS = 3; //three columns\nchar keys[ROWS][COLS] = {\n  {\'1\',\'2\',\'3\'},\n  {\'4\',\'5\',\'6\'},\n  {\'7\',\'8\',\'9\'},\n  {\'*\',\'0\',\'#\'},\n};\nbyte rowPins[ROWS] = {'+rows1+','+rows2+','+rows3+','+rows4+'}; //connect to the row pinouts of the keypad\nbyte colPins[COLS] = {'+cols1+','+cols2+','+cols3+'}; //connect to the column pinouts of the keypad\nKeypad keypad4x3 = Keypad( makeKeymap(keys), rowPins, colPins, ROWS, COLS );');
    }
    var code = '';
    return code;
    }
    



    





Blockly.Arduino['keypad_get_key'] = function(block) {

    var keypadType = block.getFieldValue('KEYPAD_TYPE');

    if(keypadType == '4x3'){

        var code = 'keypad4x3.getKey()';
    }else{
        var code = 'keypad4x4.getKey()';
    }

    return [code, Blockly.Arduino.ORDER_ATOMIC];
}
