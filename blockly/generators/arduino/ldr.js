"use strict";
goog.provide("Blockly.Arduino.ldr.js");
goog.require("Blockly.Arduino");





        //make a dropdown menu to choose the pin
        Blockly.Arduino.ldr_setup = function () {

          var id = this.getFieldValue('ID');

          var pin = this.getFieldValue('PIN');
          Blockly.Arduino.definitions_['define_ldr'+id] = '#define LDR'+id+' ' + pin + '\n';
          Blockly.Arduino.setups_['setup_ldr'] = 'pinMode(LDR, INPUT);';
          return '';
        }



        

  //read

  Blockly.Arduino.ldr_read = function () {
    var id = this.getFieldValue('ID');
    var code = 'analogRead(LDR'+id+')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  }
  

