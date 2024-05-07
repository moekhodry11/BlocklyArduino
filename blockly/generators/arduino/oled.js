"use strict";

goog.provide("Blockly.Arduino.oled");

goog.require("Blockly.Arduino");




Blockly.Arduino['oled_i2c_begin'] = function(block) {
  var id = block.getFieldValue('ID');
  var width = block.getFieldValue('WIDTH');
  var height = block.getFieldValue('HEIGHT');
  var address = block.getFieldValue('ADDRESS');

  Blockly.Arduino.addInclude('wire', '#include <Wire.h>');
  Blockly.Arduino.addInclude('gfx', '#include <Adafruit_GFX.h>');
  Blockly.Arduino.addInclude('oled', '#include <Adafruit_SSD1306.h>');
  Blockly.Arduino.addDeclaration('oled_' + id, 'Adafruit_SSD1306 display_' + id + '(' + width + ',' + height + ', &Wire, -1);');
  Blockly.Arduino.setups_['setup_oled_' + id] = 'display_' + id + '.begin(SSD1306_SWITCHCAPVCC, ' + address + ');';
  return '';
}

Blockly.Arduino['oled_print_text'] = function(block) {
  var id = block.getFieldValue('ID');
  var text = Blockly.Arduino.valueToCode(block, 'TEXT', Blockly.Arduino.ORDER_ATOMIC);

  return 'display_' + id + '.println(' + text + ');\n';
};


Blockly.Arduino['oled_set_cursor'] = function(block) {
  var id = block.getFieldValue('ID');
  var col = block.getFieldValue('COL');
  var row = block.getFieldValue('ROW');

  return 'display_' + id + '.setCursor(' + col + ', ' + row + ');\n';
};


Blockly.Arduino['oled_clear'] = function(block) {
  var id = block.getFieldValue('ID');

  return 'display_' + id + '.clearDisplay();\n';
};


Blockly.Arduino['oled_set_text_size'] = function(block) {
  var id = block.getFieldValue('ID');
  var size = block.getFieldValue('SIZE');

  return 'display_' + id + '.setTextSize(' + size + ');\n';
};

Blockly.Arduino['oled_set_text_color'] = function(block) {
  var id = block.getFieldValue('ID');
  var color = block.getFieldValue('COLOR');

  var colorCode;
  switch (color) {
    case 'White':
      colorCode = 'WHITE';
      break;
    case 'Black':
      colorCode = 'BLACK';
      break;
    case 'Invert':
      colorCode = 'INVERSE';
      break;
    default:
      colorCode = 'WHITE'; // Default to white color
  }

  return 'display_' + id + '.setTextColor(' + colorCode + ');\n';
};


Blockly.Arduino['oled_draw_pixel'] = function(block) {
  var id = block.getFieldValue('ID');
  var x = block.getFieldValue('X');
  var y = block.getFieldValue('Y');
  var color = block.getFieldValue('COLOR');

  var colorCode;
  switch (color) {
    case 'White':
      colorCode = 'WHITE';
      break;
    case 'Black':
      colorCode = 'BLACK';
      break;
    case 'Invert':
      colorCode = 'INVERSE';
      break;
    default:
      colorCode = 'WHITE'; // Default to white color
  }

  return 'display_' + id + '.drawPixel(' + x + ', ' + y + ', ' + colorCode + ');\n';
};
