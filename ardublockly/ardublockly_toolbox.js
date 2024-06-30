/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview XML toolbox embedded into a JavaScript text string.
 */
"use strict";

/** Create a namespace for the application. */
var Ardublockly = Ardublockly || {};

Ardublockly.TOOLBOX_XML =
  "<xml>" +
  "  <sep></sep>" +
  '  <category id="catLogic" name="Logic">' +
  '    <block type="controls_if"></block>' +
  '    <block type="logic_compare"></block>' +
  '    <block type="logic_operation"></block>' +
  '    <block type="logic_negate"></block>' +
  '    <block type="logic_boolean"></block>' +
  '    <block type="logic_null"></block>' +
  " </category>" +
  "  <sep></sep>" +
  '  <category id="catLoops" name="Loops">' +
  '    <block type="controls_repeat_ext">' +
  '      <value name="TIMES">' +
  '        <block type="math_number">' +
  '          <field name="NUM">10</field>' +
  "        </block>" +
  "      </value>" +
  "    </block>" +
  '    <block type="controls_whileUntil"></block>' +
  '    <block type="controls_for">' +
  '      <value name="FROM">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  "        </block>" +
  "      </value>" +
  '      <value name="TO">' +
  '        <block type="math_number">' +
  '          <field name="NUM">10</field>' +
  "        </block>" +
  "      </value>" +
  '      <value name="BY">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  "        </block>" +
  "      </value>" +
  "    </block>" +
  '    <block type="controls_flow_statements"></block>' +
  "  </category>" +
  "  <sep></sep>" +
  '  <category id="catMath" name="Math">' +
  '    <block type="math_number"></block>' +
  '    <block type="math_arithmetic"></block>' +
  '    <block type="math_single"></block>' +
  '    <block type="math_trig"></block>' +
  '    <block type="math_constant"></block>' +
  '    <block type="math_number_property"></block>' +
  '    <block type="math_change">' +
  '      <value name="DELTA">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  "        </block>" +
  "      </value>" +
  "    </block>" +
  '    <block type="math_round"></block>' +
  '    <block type="math_modulo"></block>' +
  '    <block type="math_constrain">' +
  '      <value name="LOW">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  "        </block>" +
  "      </value>" +
  '      <value name="HIGH">' +
  '        <block type="math_number">' +
  '          <field name="NUM">100</field>' +
  "        </block>" +
  "      </value>" +
  "    </block>" +
  '    <block type="math_random_int">' +
  '      <value name="FROM">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1</field>' +
  "        </block>" +
  "      </value>" +
  '      <value name="TO">' +
  '        <block type="math_number">' +
  '          <field name="NUM">100</field>' +
  "        </block>" +
  "      </value>" +
  "    </block>" +
  '    <block type="math_random_float"></block>' +
  '    <block type="base_map"></block>' +
  "  </category>" +
  "  <sep></sep>" +
  '  <category id="catText" name="Text">' +
  '    <block type="text"></block>' +
  '    <block type="text_join"></block>' +
  '    <block type="text_append">' +
  '      <value name="TEXT">' +
  '        <block type="text"></block>' +
  "      </value>" +
  "    </block>" +
  '    <block type="text_length"></block>' +
  '    <block type="text_isEmpty"></block>' +
  //'    <!--block type="text_trim"></block Need to update block -->' +
  //'    <!--block type="text_print"></block Part of the serial comms -->' +
  "  </category>" +
  "  <sep></sep>" +
  '  <category id="catFunctions" name="Functions" custom="PROCEDURE"></category>' +
  "  <sep></sep>" +
  // Khodary new catageries
  //variables
  '  <category id="catVariables" name="Variables">' +
  '    <block type="variables_declare">' +
  '      <value name="VARIABLES_VALUE">' +
  '        <block type="math_number">' +
  '          <field name="NUM">0</field>' +
  "        </block>" +
  "      </value>" +
  "    </block>" +
  '    <block type="variables_get"></block>' +
  '    <block type="variables_set"></block>' +
  '    <block type="variables_set">' +
  '      <value name="VALUE">' +
  '        <block type="variables_set_type"></block>' +
  "      </value>" +
  "    </block>" +
  '    <block type="variables_set_type"></block>' +
  "  </category>" +
  "  <sep></sep>" +
  //make one category called it Interce

  '  <category id="catInteface" name="Inteface">' +
   //comment block
   '    <block type="lcd_comment">' +
   '      <value name="TEXT">' +
   '        <block type="text"></block>' +
   "      </value>" +
   "    </block>" +
  //LCD
  '    <block type="lcd_begin">' +
  '      <field name="ID">1</field>' +
  '      <field name="LCDTYPE">standard</field>' +
  '      <field name="LCDSIZE">16x2</field>' +
  '      <field name="I2C_ADDRESS">0x27</field>' +
  '      <field name="RS">0</field>' +
  '      <field name="EN">1</field>' +
  '      <field name="D4">2</field>' +
  '      <field name="D5">3</field>' +
  '      <field name="D6">4</field>' +
  '      <field name="D7">5</field>' +
  "    </block>" +
  '    <block type="lcd_print">' +
  '      <value name="TEXT">' +
  '        <block type="text"></block>' +
  "      </value>" +
  '      <field name="ID">1</field>' +
  "    </block>" +
  '    <block type="lcd_set_cursor">' +
  '      <value name="COL">' +
  '        <block type="math_number">' +
  '          <field name="NUM">0</field>' +
  "        </block>" +
  "      </value>" +
  '      <value name="ROW">' +
  '        <block type="math_number">' +
  '          <field name="NUM">0</field>' +
  "        </block>" +
  "      </value>" +
  '      <field name="ID">1</field>' +
  "    </block>" +
  '    <block type="lcd_clear">' +
  '      <field name="ID">1</field>' +
  "    </block>" +
 


  //Keypad

  '    <block type="keypad_setup">' +
  '      <field name="ID">1</field>' +
  '      <field name="KEYPAD_TYPE">4x3</field>' +
  '      <field name="ROWS1">0</field>' +
  '      <field name="ROWS2">1</field>' +
  '      <field name="ROWS3">2</field>' +
  '      <field name="ROWS4">3</field>' +
  '      <field name="COLS1">4</field>' +
  '      <field name="COLS2">5</field>' +
  '      <field name="COLS3">6</field>' +
  '      <field name="COLS4">7</field>' +
  "    </block>" +
  '    <block type="keypad_get_key">' +
  '      <field name="ID">1</field>' +
  "    </block>" +
  //SD Card

  '    <block type="sdcard_setup">' +
  '      <field name="CS">4</field>' +
  "    </block>" +
  '    <block type="sdcard_open">' +
  '      <value name="FILENAME">' +
  '        <block type="text"></block>' +
  "      </value>" +
  "    </block>" +
  '    <block type="sdcard_write">' +
  '      <value name="DATA">' +
  '        <block type="text"></block>' +
  "      </value>" +
  "    </block>" +
  '    <block type="sdcard_read"></block>' +
  '    <block type="sdcard_close"></block>' +
  //ultrasonic

  '    <block type="ultrasonic_setup">' +
  '      <field name="TRIG">0</field>' +
  '      <field name="ECHO">1</field>' +
  "    </block>" +
  '    <block type="ultrasonic_read">' +
  '      <field name="TRIG">0</field>' +
  '      <field name="ECHO">1</field>' +
  "    </block>" +
  //tmp36

  '    <block type="tmp36_read">' +
  '      <field name="PIN">A0</field>' +
  "    </block>" +
  //ldr
  '    <block type="ldr_read">' +
  '      <field name="PIN">A0</field>' +
  "    </block>" +
  //oled

  '    <block type="oled_i2c_begin">' +
  '      <field name="ID">1</field>' +
  '      <field name="WIDTH">128</field>' +
  '      <field name="HEIGHT">64</field>' +
  '      <field name="ADDRESS">0x3C</field>' +
  "    </block>" +
  '    <block type="oled_print_text">' +
  '      <value name="TEXT">' +
  '        <block type="text"></block>' +
  "      </value>" +
  '      <field name="ID">1</field>' +
  //add cursor block
  "    </block>" +
  '    <block type="oled_set_cursor">' +
  '      <value name="COL">' +
  '        <block type="math_number">' +
  '          <field name="NUM">0</field>' +
  "        </block>" +
  "      </value>" +
  '      <value name="ROW">' +
  '        <block type="math_number">' +
  '          <field name="NUM">0</field>' +
  "        </block>" +
  "      </value>" +
  '      <field name="ID">1</field>' +
  //add clear block
  "    </block>" +
  '    <block type="oled_clear">' +
  '      <field name="ID">1</field>' +
  "    </block>" +
  '    <block type="oled_set_text_size">' +
  '      <field name="ID">1</field>' +
  '      <field name="SIZE">1</field>' +
  "    </block>" +
  '    <block type="oled_set_text_color">' +
  '      <field name="ID">1</field>' +
  '      <field name="COLOR">White</field>' +
  "    </block>" +
  '    <block type="oled_draw_pixel">' +
  '      <value name="X">' +
  '        <block type="math_number">' +
  '          <field name="NUM">0</field>' +
  "        </block>" +
  "      </value>" +
  '      <value name="Y">' +
  '        <block type="math_number">' +
  '          <field name="NUM">0</field>' +
  "        </block>" +
  "      </value>" +
  '      <field name="ID">1</field>' +
  "    </block>" +
  "  </category>" +
  "  <sep></sep>" +
  //end of new catageries
  '  <category id="catInputOutput" name="Input/Output">' +
  '    <block type="io_digitalwrite">' +
  '      <value name="STATE">' +
  '        <block type="io_highlow"></block>' +
  "      </value>" +
  "    </block>" +
  '    <block type="io_digitalread"></block>' +
  '    <block type="io_builtin_led">' +
  '      <value name="STATE">' +
  '        <block type="io_highlow"></block>' +
  "      </value>" +
  "    </block>" +
  '    <block type="io_analogwrite"></block>' +
  '    <block type="io_analogread"></block>' +
  '    <block type="io_highlow"></block>' +
  '    <block type="io_pulsein">' +
  '      <value name="PULSETYPE">' +
  '        <shadow type="io_highlow"></shadow>' +
  "      </value>" +
  "    </block>" +
  '    <block type="io_pulsetimeout">' +
  '      <value name="PULSETYPE">' +
  '        <shadow type="io_highlow"></shadow>' +
  "      </value>" +
  '      <value name="TIMEOUT">' +
  '        <shadow type="math_number">' +
  '          <field name="NUM">100</field>' +
  "        </shadow>" +
  "      </value>" +
  "    </block>" +
  "  </category>" +
  "  <sep></sep>" +
  '  <category id="catTime" name="Time">' +
  '    <block type="time_delay">' +
  '      <value name="DELAY_TIME_MILI">' +
  '        <block type="math_number">' +
  '          <field name="NUM">1000</field>' +
  "        </block>" +
  "      </value>" +
  "    </block>" +
  '    <block type="time_delaymicros">' +
  '      <value name="DELAY_TIME_MICRO">' +
  '        <block type="math_number">' +
  '          <field name="NUM">100</field>' +
  "        </block>" +
  "      </value>" +
  "    </block>" +
  '    <block type="time_millis"></block>' +
  '    <block type="time_micros"></block>' +
  '    <block type="infinite_loop"></block>' +
  "  </category>" +
  "  <sep></sep>" +
  '  <category id="catAudio" name="Audio">' +
  '    <block type="io_tone">' +
  '      <field name="TONEPIN">0</field>' +
  '      <value name="FREQUENCY">' +
  '        <shadow type="math_number">' +
  '          <field name="NUM">220</field>' +
  "        </shadow>" +
  "      </value>" +
  "    </block>" +
  '    <block type="io_notone"></block>' +
  "  </category>" +
  "  <sep></sep>" +
  '  <category id="catMotors" name="Motors">' +
  '    <block type="servo_write">' +
  '      <value name="SERVO_ANGLE">' +
  '        <block type="math_number">' +
  '          <field name="NUM">90</field>' +
  "        </block>" +
  "      </value>" +
  "    </block>" +
  '    <block type="servo_read"></block>' +
  //dc motor

  //dc motor init
  '    <block type="setup_motor">' +
  '      <field name="MOTOR_NUMBER">1</field>' +
  '      <field name="IN1">1</field>' +
  '      <field name="IN2">2</field>' +
  '      <field name="ENA">3</field>' +
  "    </block>" +
  //dc motor control
  '    <block type="control_motor">' +
  '      <field name="MOTOR_NUMBER">1</field>' +
  '      <value name="SPEED">' +
  '        <block type="math_number">' +
  '          <field name="NUM">150</field>' +
  "        </block>" +
  "      </value>" +
  "    </block>" +
  
  
  




  '    <block type="stepper_config">' +
  '      <field name="STEPPER_NUMBER_OF_PINS">2</field>' +
  '      <field name="STEPPER_PIN1">1</field>' +
  '      <field name="STEPPER_PIN2">2</field>' +
  '      <value name="STEPPER_STEPS">' +
  '        <block type="math_number">' +
  '          <field name="NUM">100</field>' +
  "        </block>" +
  "      </value>" +
  '      <value name="STEPPER_SPEED">' +
  '        <block type="math_number">' +
  '          <field name="NUM">10</field>' +
  "        </block>" +
  "      </value>" +
  "    </block>" +
  '    <block type="stepper_step">' +
  '      <value name="STEPPER_STEPS">' +
  '        <block type="math_number">' +
  '          <field name="NUM">10</field>' +
  "        </block>" +
  "      </value>" +
  "    </block>" +
  "  </category>" +
  "  <sep></sep>" +
  '  <category id="catComms" name="Comms">' +
  '    <block type="serial_setup"></block>' +
  '    <block type="serial_print"></block>' +
  '    <block type="text_prompt_ext">' +
  '      <value name="TEXT">' +
  '        <block type="text"></block>' +
  "      </value>" +
  "    </block>" +
  '    <block type="spi_setup"></block>' +
  '    <block type="spi_transfer"></block>' +
  '    <block type="spi_transfer_return"></block>' +
  "  </category>" +
  "</xml>";
