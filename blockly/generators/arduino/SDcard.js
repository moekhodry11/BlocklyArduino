/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for the logic blocks.
 */
'use strict';

goog.provide('Blockly.Arduino.sdcard');

goog.require('Blockly.Arduino');

/**
 * Code generator to create if/if else/else statement.
 * Arduino code: loop { if (X)/else if ()/else { X } }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */

//SDcard 

//set sdcard on pin 10 and add spi and sd library make object of File and check if sd card is present or not

Blockly.Arduino['sdcard_setup'] = function(block) {

    /* get the dropdown value */
    var cs = block.getFieldValue('CS');

    Blockly.Arduino.addInclude('sdcard', '#include <SD.h>\n#include <SPI.h>');

    Blockly.Arduino.addDeclaration('sdcard', 'File myFile;');

    Blockly.Arduino.addSetup('sdcard', 'pinMode(10, OUTPUT);\n  if (!SD.begin('+cs+')) {\n    Serial.println("initialization failed!");\n    return;\n}\nSerial.println("initialization done.");', true);
    var code = '';
    return code;
    }

Blockly.Arduino['sdcard_open'] = function(block) {
    var filename = Blockly.Arduino.valueToCode(block, 'FILENAME', Blockly.Arduino.ORDER_ATOMIC);
    var mode = block.getFieldValue('MODE');
    var code = 'myFile = SD.open('+filename+', FILE_'+mode+');\n';
    return code;
    }

Blockly.Arduino['sdcard_write'] = function(block) {
    var data = Blockly.Arduino.valueToCode(block, 'DATA', Blockly.Arduino.ORDER_ATOMIC);

    //check if file is open or not
    var code = 'if (myFile) {\n  myFile.println('+data+');\n} else {\n  Serial.println("error opening");\n}\n';
    
    
    return code;
    }

Blockly.Arduino['sdcard_read'] = function(block) {
    var code = 'myFile.read()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
    }

Blockly.Arduino['sdcard_close'] = function(block) {
    var code = 'myFile.close();\n';
    return code;
    }




