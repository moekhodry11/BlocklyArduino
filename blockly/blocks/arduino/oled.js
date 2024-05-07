"use strict";

goog.provide("Blockly.Blocks.oled");

goog.require("Blockly.Blocks");
goog.require("Blockly.Types");

Blockly.Blocks.oled.HUE = 100;

Blockly.Blocks["oled_i2c_begin"] = {
  init: function () {
    this.setHelpUrl("http://arduino.cc/en/Reference/LiquidCrystalBegin");
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField(Blockly.Msg.ARD_OLED_I2C_BEGIN)
      .appendField("Set I2C OLED On")
      .appendField("OLED #")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      )
      .appendField("Width")
      .appendField(new Blockly.FieldDropdown([["128"], ["256"]]), "WIDTH")
      .appendField("Height")
      .appendField(new Blockly.FieldDropdown([["64"], ["128"]]), "HEIGHT")
      .appendField("Address")
      .appendField(
        new Blockly.FieldDropdown([["0x3C"], ["0x3D"], ["0x3E"], ["0x3F"]]),
        "ADDRESS"
      );

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_OLED_I2C_BEGIN_TIP);
  },
};

Blockly.Blocks["oled_print_text"] = {
  init: function () {
    this.setHelpUrl("http://arduino.cc/en/Reference/LiquidCrystalPrint");
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendValueInput("TEXT")
      .appendField("Print to OLED")
      .appendField(Blockly.Msg.ARD_OLED_PRINT_TEXT)
      .setCheck(Blockly.Types.TEXT.checkList);
    this.appendDummyInput()
      .appendField("OLED #")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_OLED_PRINT_TEXT_TIP);
  },
};


// Block for setting the cursor position on the OLED display
Blockly.Blocks['oled_set_cursor'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/LiquidCrystalSetCursor');
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField("Set cursor position")
      .appendField("column")
      .appendField(
        new Blockly.FieldNumber(0, 0),
        "COL"
      )
      .appendField("row")
      .appendField(
        new Blockly.FieldNumber(0, 0),
        "ROW"
      )
      .appendField("on OLED #")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_OLED_SET_CURSOR_TIP);
  }
};


// Block for clearing the OLED display
Blockly.Blocks['oled_clear'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/LiquidCrystalClear');
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField("Clear OLED #")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_OLED_CLEAR_TIP);
  }
};


// Block for setting text size on the OLED display
Blockly.Blocks['oled_set_text_size'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/LiquidCrystalSetTextSize');
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField("Set text size")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "SIZE"
      )
      .appendField("on OLED #")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_OLED_SET_TEXT_SIZE_TIP);
  }
};

// Block for setting text color on the OLED display
Blockly.Blocks['oled_set_text_color'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/LiquidCrystalSetTextColor');
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField("Set text color")
      .appendField(
        new Blockly.FieldDropdown([["White"], ["Black"], ["Invert"]]),
        "COLOR"
      )
      .appendField("on OLED #")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_OLED_SET_TEXT_COLOR_TIP);
  }
};


// Block for drawing a pixel on the OLED display
Blockly.Blocks['oled_draw_pixel'] = {
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/LiquidCrystalDrawPixel');
    this.setColour(Blockly.Blocks.oled.HUE);
    this.appendDummyInput()
      .appendField("Draw pixel at")
      .appendField("X:")
      .appendField(
        new Blockly.FieldNumber(0, 0, Infinity, 1),
        "X"
      )
      .appendField("Y:")
      .appendField(
        new Blockly.FieldNumber(0, 0, Infinity, 1),
        "Y"
      )
      .appendField("Color:")
      .appendField(
        new Blockly.FieldDropdown([["White"], ["Black"], ["Invert"]]),
        "COLOR"
      )
      .appendField("on OLED #")
      .appendField(
        new Blockly.FieldDropdown([["1"], ["2"], ["3"], ["4"]]),
        "ID"
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_OLED_DRAW_PIXEL_TIP);
  }
};
