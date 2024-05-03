"use strict";
goog.provide("Blockly.Arduino.clanguage");
goog.require("Blockly.Arduino");

//c language variables

Blockly.Arduino["variables_declare"] = function (block) {
  var dropdown_variables_type = block.getFieldValue("VARIABLES_TYPE");
  var text_variables_name = block.getFieldValue("VARIABLES_NAME");
  var value_variables_value = Blockly.Arduino.valueToCode(
    block,
    "VARIABLES_VALUE",
    Blockly.Arduino.ORDER_ATOMIC
  );

  var code = `${dropdown_variables_type} ${text_variables_name} = ${value_variables_value};\n`;
  return code;
};
//setting value to the variable

Blockly.Arduino["variables_set"] = function (block) {
  var text_variables_name = block.getFieldValue("VARIABLES_NAME");
  var value_variables_value = Blockly.Arduino.valueToCode(
    block,
    "VARIABLES_VALUE",
    Blockly.Arduino.ORDER_ATOMIC
  );

  var code = `${text_variables_name} = ${value_variables_value};\n`;
  return code;
};

//declare array in c language

Blockly.Arduino["array_declare"] = function (block) {
  var dropdown_array_type = block.getFieldValue("ARRAY_TYPE");
  var text_array_name = block.getFieldValue("ARRAY_NAME");
  var number_array_size = block.getFieldValue("ARRAY_SIZE");

  var code = `${dropdown_array_type} ${text_array_name}[${number_array_size}];\n`;
  return code;
};

//seeting text in this array

Blockly.Arduino["array_set"] = function (block) {
  var text_array_name = block.getFieldValue("ARRAY_NAME");
  var number_array_index = block.getFieldValue("ARRAY_INDEX");
  var value_array_value = Blockly.Arduino.valueToCode(
    block,
    "ARRAY_VALUE",
    Blockly.Arduino.ORDER_ATOMIC
  );

  var code = `${text_array_name}[${number_array_index}] = ${value_array_value};\n`;
  return code;
};
