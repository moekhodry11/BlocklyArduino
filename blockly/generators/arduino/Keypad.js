'use strict';

goog.provide('Blockly.Arduino.keypad');

goog.require('Blockly.Arduino');

Blockly.Arduino['keypad_setup'] = function(block) {
    var keypadType = block.getFieldValue('KEYPAD_TYPE');
    var id = block.getFieldValue('ID');
    var rows1 = block.getFieldValue('ROWS1');
    var rows2 = block.getFieldValue('ROWS2');
    var rows3 = block.getFieldValue('ROWS3');
    var rows4 = block.getFieldValue('ROWS4');
    var cols1 = block.getFieldValue('COLS1');
    var cols2 = block.getFieldValue('COLS2');
    var cols3 = block.getFieldValue('COLS3');
    var cols4 = block.getFieldValue('COLS4');
    
    Blockly.Arduino.reservePin(
        block, rows1, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');
        Blockly.Arduino.reservePin(
            block, rows2, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');
            Blockly.Arduino.reservePin(
                block, rows3, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');
                Blockly.Arduino.reservePin(
                    block, rows4, Blockly.Arduino.PinTypes.OUTPUT, 'Digital Write');


                    Blockly.Arduino.reservePin(
                        block, cols1, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');
                        Blockly.Arduino.reservePin(
                            block, cols2, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');
                            Blockly.Arduino.reservePin(
                                block, cols3, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');
                                Blockly.Arduino.reservePin(
                                    block, cols4, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');


                                    
    Blockly.Arduino.addInclude('keypad', '#include <Keypad.h>');
    if(keypadType == '4x4'){

        Blockly.Arduino.addDeclaration('keypad'+id, 'char keys'+id+'[4][4] = {\n  {\'1\',\'2\',\'3\',\'A\'},\n  {\'4\',\'5\',\'6\',\'B\'},\n  {\'7\',\'8\',\'9\',\'C\'},\n  {\'*\',\'0\',\'#\',\'D\'}\n};\nbyte rowPins'+id+'[4] = {'+rows1+','+rows2+','+rows3+','+rows4+'}; //connect to the row pinouts of the keypad\nbyte colPins'+id+'[4] = {'+cols1+','+cols2+','+cols3+','+cols4+'}; //connect to the column pinouts of the keypad\nKeypad keypad'+id+' = Keypad( makeKeymap(keys'+id+'), rowPins'+id+', colPins'+id+', 4, 4 );');
        
    }else{

        Blockly.Arduino.addDeclaration('keypad'+id, 'char keys'+id+'[4][3] = {\n  {\'1\',\'2\',\'3\'},\n  {\'4\',\'5\',\'6\'},\n  {\'7\',\'8\',\'9\'},\n  {\'*\',\'0\',\'#\'},\n};\nbyte rowPins'+id+'[4] = {'+rows1+','+rows2+','+rows3+','+rows4+'}; //connect to the row pinouts of the keypad\nbyte colPins'+id+'[3] = {'+cols1+','+cols2+','+cols3+'}; //connect to the column pinouts of the keypad\nKeypad keypad'+id+' = Keypad( makeKeymap(keys'+id+'), rowPins'+id+', colPins'+id+', 4, 3 );');
    }
    var code = '';
    return code;
    }
    



    





Blockly.Arduino['keypad_get_key'] = function(block) {
    var id = block.getFieldValue('ID');
    var code = 'keypad'+id+'.getKey()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
}

