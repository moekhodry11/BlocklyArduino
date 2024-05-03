"use strict";

goog.provide("Blockly.Blocks.oled");

goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.oled.HUE = 250;

Blockly.Blocks["oled_setup"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Setup OLED")
      .appendField("SDA")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "SDA"
      )
      .appendField("SCL")
      .appendField(
        new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.digitalPins),
        "SCL"
      )
      .appendField("Address")
      .appendField(new Blockly.FieldTextInput("0x3C"), "ADDRESS");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.oled.HUE);
    this.setTooltip("Setup the OLED");
    this.setHelpUrl("http://arduino.cc/en/Reference/Keypad");
  },
};

Blockly.Blocks["oled_print"] = {
  init: function () {
    this.appendValueInput("TEXT").appendField("Print On OLED");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.oled.HUE);
    this.setTooltip("Print on the OLED");
    this.setHelpUrl("http://arduino.cc/en/Reference/Keypad");
  },
};

Blockly.Blocks["oled_clear"] = {
  init: function () {
    this.appendDummyInput().appendField("Clear OLED");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.oled.HUE);
    this.setTooltip("Clear the OLED");
    this.setHelpUrl("http://arduino.cc/en/Reference/Keypad");
  },
};


Blockly.Blocks["oled_display"] = {
  init: function () {
    this.appendDummyInput().appendField("Display OLED");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.oled.HUE);
    this.setTooltip("Display the OLED");
    this.setHelpUrl("http://arduino.cc/en/Reference/Keypad");
  },
};

Blockly.Blocks["oled_set_text_size"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set Text Size")
      .appendField(
        new Blockly.FieldDropdown([
          ["1", "1"],
          ["2", "2"],
          ["3", "3"],
          ["4", "4"],
        ]),
        "SIZE"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.oled.HUE);
    this.setTooltip("Set the text size");
    this.setHelpUrl("http://arduino.cc/en/Reference/Keypad");
  },
};

Blockly.Blocks["oled_set_text_color"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set Text Color")
      .appendField(
        new Blockly.FieldDropdown([
          ["WHITE", "WHITE"],
          ["BLACK", "BLACK"],
        ]),
        "COLOR"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.oled.HUE);
    this.setTooltip("Set the text color");
    this.setHelpUrl("http://arduino.cc/en/Reference/Keypad");
  },
};

Blockly.Blocks["oled_set_cursor"] = {
  init: function () {
    this.appendValueInput("COL").appendField("Set Cursor");
    this.appendValueInput("ROW").appendField("Row");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.oled.HUE);
    this.setTooltip("Set the cursor");
    this.setHelpUrl("http://arduino.cc/en/Reference/Keypad");
  },
};

Blockly.Blocks["oled_draw_pixel"] = {
  init: function () {
    this.appendValueInput("X").appendField("Draw Pixel");
    this.appendValueInput("Y").appendField("Y");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.oled.HUE);
    this.setTooltip("Draw a pixel");
    this.setHelpUrl("http://arduino.cc/en/Reference/Keypad");
  },
};

Blockly.Blocks["oled_draw_line"] = {
  init: function () {
    this.appendValueInput("X1").appendField("Draw Line");
    this.appendValueInput("Y1").appendField("Y1");
    this.appendValueInput("X2").appendField("X2");
    this.appendValueInput("Y2").appendField("Y2");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.oled.HUE);
    this.setTooltip("Draw a line");
    this.setHelpUrl("http://arduino.cc/en/Reference/Keypad");
  },
};

Blockly.Blocks["oled_draw_rect"] = {
  init: function () {
    this.appendValueInput("X").appendField("Draw Rectangle");
    this.appendValueInput("Y").appendField("Y");
    this.appendValueInput("WIDTH").appendField("Width");
    this.appendValueInput("HEIGHT").appendField("Height");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.oled.HUE);
    this.setTooltip("Draw a rectangle");
    this.setHelpUrl("http://arduino.cc/en/Reference/Keypad");
  },
};

Blockly.Blocks["oled_draw_circle"] = {
  init: function () {
    this.appendValueInput("X").appendField("Draw Circle");
    this.appendValueInput("Y").appendField("Y");
    this.appendValueInput("RADIUS").appendField("Radius");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.oled.HUE);
    this.setTooltip("Draw a circle");
    this.setHelpUrl("http://arduino.cc/en/Reference/Keypad");
  },
};

