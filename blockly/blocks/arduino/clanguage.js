"use strict";
goog.provide("Blockly.Blocks.clanguage");
goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.clanguage.HUE = 160;

//c language variables

Blockly.Blocks["variables_declare"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ["uint8", "uint8"],
          ["uint16", "uint16"],
          ["uint32", "uint32"],
          ["int", "int"],
          ["float", "float"],
          ["double", "double"],
          ["char", "char"],
        ]),
        "VARIABLES_TYPE"
      )
      .appendField(new Blockly.FieldTextInput("name"), "VARIABLES_NAME")
      .appendField("=");
    this.appendValueInput("VARIABLES_VALUE").setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.clanguage.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

//setting value to the variable

Blockly.Blocks["variables_set"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("name"), "VARIABLES_NAME")
      .appendField("=");
    this.appendValueInput("VARIABLES_VALUE").setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.clanguage.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

//declare array in c language

Blockly.Blocks["array_declare"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ["uint8", "uint8"],
          ["uint16", "uint16"],
          ["uint32", "uint32"],
          ["int", "int"],
          ["float", "float"],
          ["double", "double"],
          ["char", "char"],
        ]),
        "ARRAY_TYPE"
      )
      .appendField(new Blockly.FieldTextInput("name"), "ARRAY_NAME")
      .appendField("[")
      .appendField(new Blockly.FieldNumber(0), "ARRAY_SIZE")
      .appendField("]");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.clanguage.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

//seeting text in this array

Blockly.Blocks["array_set"] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput("name"), "ARRAY_NAME")
      .appendField("[")
      .appendField(new Blockly.FieldNumber(0), "ARRAY_INDEX")
      .appendField("]");
    this.appendValueInput("ARRAY_VALUE").setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.clanguage.HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};
