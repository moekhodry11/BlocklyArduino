/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * Based on work of Fred Lin (gasolin@gmail.com) for Blocklyduino.
 *
 * @fileoverview Helper functions for generating Arduino language (C++).
 */
'use strict';

goog.provide('Blockly.bluepill');

goog.require('Blockly.Generator');
goog.require('Blockly.StaticTyping');


/**
 * Arduino code generator.
 * @type {!Blockly.Generator}
 */
Blockly.bluepill = new Blockly.Generator('bluepill');
Blockly.bluepill.StaticTyping = new Blockly.StaticTyping();

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * Arduino specific keywords defined in: http://arduino.cc/en/Reference/HomePage
 * @private
 */
Blockly.bluepill.addReservedWords(
    'Blockly,' +  // In case JS is evaled in the current window.
    'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,' +
    'define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,integer,' +
    'constants,floating,point,void,boolean,char,unsigned,byte,int,word,long,' +
    'float,double,string,String,array,static,volatile,const,sizeof,pinMode,' +
    'digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,' +
    'noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,' +
    'min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,' +
    'lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,' +
    'detachInterrupt,interrupts,noInterrupts');

/**
 * A list of types tasks that the pins can be assigned. Used to track usage and
 * warn if the same pin has been assigned to more than one task.
 */
Blockly.bluepill.PinTypes = {
    INPUT: 'INPUT',
    OUTPUT: 'OUTPUT',
    PWM: 'PWM',
    SERVO: 'SERVO',
    STEPPER: 'STEPPER',
    SERIAL: 'SERIAL',
    I2C: 'I2C/TWI',
    SPI: 'SPI'
  };
  

  /**
 * bluepill generator short name for
 * Blockly.Generator.prototype.FUNCTION_NAME_PLACEHOLDER_
 * @type {!string}
 */
Blockly.bluepill.DEF_FUNC_NAME = Blockly.bluepill.FUNCTION_NAME_PLACEHOLDER_;

/**
 * Initialises the database of global definitions, the setup function, function
 * names, and variable names.
 * @param {Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.bluepill.init = function(workspace) {
    // Create a dictionary of definitions to be printed at the top of the sketch
    Blockly.bluepill.includes_ = Object.create(null);
    // Create a dictionary of global definitions to be printed after variables
    Blockly.bluepill.definitions_ = Object.create(null);
    // Create a dictionary of variables
    Blockly.bluepill.variables_ = Object.create(null);
    // Create a dictionary of functions from the code generator
    Blockly.bluepill.codeFunctions_ = Object.create(null);
    // Create a dictionary of functions created by the user
    Blockly.bluepill.userFunctions_ = Object.create(null);
    // Create a dictionary mapping desired function names in definitions_
    // to actual function names (to avoid collisions with user functions)
    Blockly.bluepill.functionNames_ = Object.create(null);
    // Create a dictionary of setups to be printed in the setup() function
    Blockly.bluepill.setups_ = Object.create(null);
    // Create a dictionary of pins to check if their use conflicts
    Blockly.bluepill.pins_ = Object.create(null);
  
    if (!Blockly.bluepill.variableDB_) {
      Blockly.bluepill.variableDB_ =
          new Blockly.Names(Blockly.bluepill.RESERVED_WORDS_);
    } else {
      Blockly.bluepill.variableDB_.reset();
    }
  
    // Iterate through to capture all blocks types and set the function arguments
    var varsWithTypes = Blockly.bluepill.StaticTyping.collectVarsWithTypes(workspace);
    Blockly.bluepill.StaticTyping.setProcedureArgs(workspace, varsWithTypes);
  
    // Set variable declarations with their Arduino type in the defines dictionary
    for (var varName in varsWithTypes) {
      Blockly.bluepill.addVariable(varName,
          Blockly.bluepill.getArduinoType_(varsWithTypes[varName]) +' ' +
          Blockly.bluepill.variableDB_.getName(varName, Blockly.Variables.NAME_TYPE) + ';');
    }
  };