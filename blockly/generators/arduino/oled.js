"use strict";

goog.provide("Blockly.Arduino.oled");

goog.require("Blockly.Arduino");

Blockly.Arduino["oled_setup"] = function (block) {
  var sda = block.getFieldValue("SDA");
  var scl = block.getFieldValue("SCL");
  var address = block.getFieldValue("ADDRESS");
  Blockly.Arduino.addInclude("oled", "#include <Adafruit_SSD1306.h>");
  Blockly.Arduino.addDeclaration(
    "oled",
    "Adafruit_SSD1306 display(" + address + ");"
  );
  Blockly.Arduino.addSetup(
    "oled",
    "display.begin(SSD1306_SWITCHCAPVCC, " + sda + ", " + scl + ");"
  );
  var code = "";
  return code;
};

Blockly.Arduino["oled_print"] = function (block) {
  var text = Blockly.Arduino.valueToCode(block, "TEXT", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'display.println('+text+');\n';
  return code;
};


Blockly.Arduino["oled_clear"] = function (block) {
  var code = "display.clearDisplay();\n";
  return code;
};

Blockly.Arduino["oled_display"] = function (block) {
  var code = "display.display();\n";
  return code;
};

Blockly.Arduino["oled_set_text_size"] = function (block) {
  var size = block.getFieldValue("SIZE");
  var code = "display.setTextSize(" + size + ");\n";
  return code;
};

Blockly.Arduino["oled_set_text_color"] = function (block) {
  var color = block.getFieldValue("COLOR");
  var code = "display.setTextColor(" + color + ");\n";
  return code;
};

Blockly.Arduino["oled_set_cursor"] = function (block) {
  var col = Blockly.Arduino.valueToCode(block, "COL", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var row = Blockly.Arduino.valueToCode(block, "ROW", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = "display.setCursor(" + col + ", " + row + ");\n";
  return code;
};

Blockly.Arduino["oled_draw_pixel"] = function (block) {
  var x = Blockly.Arduino.valueToCode(block, "X", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var y = Blockly.Arduino.valueToCode(block, "Y", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = "display.drawPixel(" + x + ", " + y + ", WHITE);\n";
  return code;
};


Blockly.Arduino["oled_draw_line"] = function (block) {
  var x1 = Blockly.Arduino.valueToCode(block, "X1", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var y1 = Blockly.Arduino.valueToCode(block, "Y1", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var x2 = Blockly.Arduino.valueToCode(block, "X2", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var y2 = Blockly.Arduino.valueToCode(block, "Y2", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = "display.drawLine(" + x1 + ", " + y1 + ", " + x2 + ", " + y2 + ", WHITE);\n";
  return code;
};

Blockly.Arduino["oled_draw_rect"] = function (block) {
  var x = Blockly.Arduino.valueToCode(block, "X", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var y = Blockly.Arduino.valueToCode(block, "Y", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var w = Blockly.Arduino.valueToCode(block, "W", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var h = Blockly.Arduino.valueToCode(block, "H", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = "display.drawRect(" + x + ", " + y + ", " + w + ", " + h + ", WHITE);\n";
  return code;
};

Blockly.Arduino["oled_fill_rect"] = function (block) {
  var x = Blockly.Arduino.valueToCode(block, "X", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var y = Blockly.Arduino.valueToCode(block, "Y", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var w = Blockly.Arduino.valueToCode(block, "W", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var h = Blockly.Arduino.valueToCode(block, "H", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = "display.fillRect(" + x + ", " + y + ", " + w + ", " + h + ", WHITE);\n";
  return code;
};

Blockly.Arduino["oled_draw_circle"] = function (block) {
  var x = Blockly.Arduino.valueToCode(block, "X", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var y = Blockly.Arduino.valueToCode(block, "Y", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var r = Blockly.Arduino.valueToCode(block, "R", Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = "display.drawCircle(" + x + ", " + y + ", " + r + ", WHITE);\n";
  return code;
};