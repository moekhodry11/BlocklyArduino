"use strict";
goog.provide("Blockly.Arduino.ldr.js");
goog.require("Blockly.Arduino");





        //make a dropdown menu to choose the pin
        Blockly.Arduino.ldr_setup = function () {

          var dropdown_pin = this.getFieldValue('PIN');
          Blockly.Arduino.definitions_['define_ldr'] = '#define LDR ' + dropdown_pin + '\n';
          Blockly.Arduino.setups_['setup_ldr'] = 'pinMode(LDR, INPUT);';
          return '';
        }



        

  //read

  Blockly.Arduino.ldr_read = function () {
      
        var code = 'analogRead(LDR)';
        return [code, Blockly.Arduino.ORDER_ATOMIC];
      };



