/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Implements the required data for functions for selecting
 *     amongst different Arduino boards.
 */
'use strict';

goog.provide('Blockly.bluepill.Boards');

goog.require('Blockly.bluepill');


/**
 * Helper function to generate an array of pins (each an array of length 2) for
 * the digital IO.
 * @param {!integer} pinStart Start number for the IOs pin list to generate.
 * @param {!integer} pinEnd Last inclusive number for the list to generate.
 * @return {!array} Two dimensional array with the name and value for the
 *     digital IO pins.
 */
Blockly.bluepill.Boards.generateDigitalIo = function(pinStart, pinEnd) {
  var digitalIo = [];
  for (var i = pinStart; i < (pinEnd + 1); i++) {
    digitalIo.push([i.toString(), i.toString()]);
  }
  return digitalIo;
};

/**
 * Helper function to generate an array of pins (each an array of length 2) for
 * the analogue IO.
 * @param {!integer} pinStart Start number for the IOs pin list to generate.
 * @param {!integer} pinEnd Last inclusive number for the list to generate.
 * @return {!array} Two dimensional array with the name and value for the
 *     analogue IO pins.
 */
Blockly.bluepill.Boards.generateAnalogIo = function(pinStart, pinEnd) {
  var analogIo = [];
  for (var i = pinStart; i < (pinEnd + 1); i++) {
    analogIo.push(['A' + i.toString(), 'A' + i.toString()]);
  }
  return analogIo;
};

/**
 * Creates a new Board Profile copying all the attributes from an existing
 * profile, with the exception of the name, and optionally the description and
 * compiler flag.
 * @param {!string} name_ Mandatory new name of the new board profile.
 * @param {string=} description Optional new description of the new profile.
 * @param {string=} compilerFlag Optional new description of the new profile.
 * @return {!Object} Duplicated object with the different argument data.
 */
Blockly.bluepill.Boards.duplicateBoardProfile =
    function(originalBoard, name_, description, compilerFlag) {
  return {
    name: name_,
    description: description || originalBoard.description,
    compilerFlag: compilerFlag || originalBoard.compilerFlag,
    analogPins: originalBoard.analogPins,
    digitalPins: originalBoard.digitalPins,
    pwmPins: originalBoard.pwmPins,
    serial: originalBoard.serial,
    serialPins: originalBoard.serialPins,
    serialSpeed: originalBoard.serialSpeed,
    spi: originalBoard.spi,
    spiPins: originalBoard.spiPins,
    spiClockDivide: originalBoard.spiClockDivide,
    i2c: originalBoard.i2c,
    i2cPins: originalBoard.i2cPins,
    i2cSpeed: originalBoard.i2cSpeed,
    builtinLed: originalBoard.builtinLed,
    interrupt: originalBoard.interrupt
  }
};

/** Object to contain all Arduino board profiles. */
Blockly.bluepill.Boards.profiles = new Object();

Blockly.bluepill.Boards.profiles.stm32 = {
  name: 'STM32F103C6',
  description: 'Stm32 ',
  compilerFlag: 'arduino:avr:uno',
  analogPins: Blockly.bluepill.Boards.generateAnalogIo(0, 7),
  digitalPins: Blockly.bluepill.Boards.generateDigitalIo(0, 15).concat(
                   Blockly.bluepill.Boards.generateAnalogIo(0, 7)),
  pwmPins: [['3', '3'], ['5', '5'], ['6', '6'], ['9', '9'], ['10', '10'],
            ['11', '11']],
  serial: [['serial', 'Serial']],
  serialPins: { Serial: [['RX', '0'], ['TX', '1']] },
  serialSpeed: [['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
  spi: [['SPI', 'SPI']],
  spiPins: { SPI: [['MOSI', '11'], ['MISO', '12'], ['SCK', '13']] },
  spiClockDivide: [['2 (8MHz)', 'SPI_CLOCK_DIV2'],
                   ['4 (4MHz)', 'SPI_CLOCK_DIV4'],
                   ['8 (2MHz)', 'SPI_CLOCK_DIV8'],
                   ['16 (1MHz)', 'SPI_CLOCK_DIV16'],
                   ['32 (500KHz)', 'SPI_CLOCK_DIV32'],
                   ['64 (250KHz)', 'SPI_CLOCK_DIV64'],
                   ['128 (125KHz)', 'SPI_CLOCK_DIV128']],
  i2c: [['I2C', 'Wire']],
  i2cPins: { Wire: [['SDA', 'A4'], ['SCL', 'A5']] },
  i2cSpeed: [['100kHz', '100000L'], ['400kHz', '400000L']],
  builtinLed: [['BUILTIN_1', '13']],
  interrupt: [['interrupt0', '2'], ['interrupt1', '3']]
};

Blockly.bluepill.Boards.changeBoard = function(workspace, newBoard) {
  if (Blockly.bluepill.Boards.profiles[newBoard] === undefined) {
    console.log('Tried to set non-existing Arduino board: ' + newBoard);
    return;
  }
  Blockly.bluepill.Boards.selected = Blockly.bluepill.Boards.profiles[newBoard];
  // Update the pin out of all the blocks that uses them
  var blocks = workspace.getAllBlocks();
  for (var i = 0; i < blocks.length; i++) {
    var updateFields = blocks[i].updateFields;
    if (updateFields) {
      updateFields.call(blocks[i]);
    }
  }
};

Blockly.bluepill.Boards.refreshBlockFieldDropdown =
    function(block, fieldName, boardKey) {
  var field = block.getField(fieldName);
  var fieldValue = field.getValue();
  var dataArray = Blockly.bluepill.Boards.selected[boardKey];
  field.menuGenerator_ = dataArray;

  var currentValuePresent = false;
  for (var i = 0; i < dataArray.length; i++) {
    if (fieldValue == dataArray[i][1]) {
      currentValuePresent = true;
    }
  }
  // If the old value is not present any more, add a warning to the block.
  if (!currentValuePresent) {
    block.setWarningText(
        'The old pin value ' + fieldValue + ' is no longer available.', 'bPin');
  } else {
    block.setWarningText(null, 'bPin');
  }
};