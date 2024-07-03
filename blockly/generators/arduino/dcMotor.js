"use strict";
goog.provide("Blockly.Arduino.dcMotor");
goog.require("Blockly.Arduino");

Blockly.Arduino["setup_motor"] = function (block) {
  var motorNumber = block.getFieldValue("MOTOR_NUMBER");
  var in1 = block.getFieldValue("IN1");
  var in2 = block.getFieldValue("IN2");
  var ena = block.getFieldValue("ENA");

  // Reserve pins for motor before setup
  Blockly.Arduino.reservePin(block, in1, Blockly.Arduino.PinTypes.OUTPUT, "Motor1");
  Blockly.Arduino.reservePin(block, in2, Blockly.Arduino.PinTypes.OUTPUT, "Motor2");
  Blockly.Arduino.reservePin(block, ena, Blockly.Arduino.PinTypes.PWM, "Motor");

  // Check if this motor number has already been declared
  var declarationName = `motor_${motorNumber}_declared`;
  if (!Blockly.Arduino.definitions_[declarationName]) {
    // If not declared, add the declaration
    Blockly.Arduino.addDeclaration(
      declarationName,
      `#define MOTOR${motorNumber}_IN1 ${in1}
#define MOTOR${motorNumber}_IN2 ${in2}
#define MOTOR${motorNumber}_ENA ${ena}
`
    );
  }

  // Add pinMode statements to setup code
  var setupCode = `
pinMode(MOTOR${motorNumber}_IN1, OUTPUT);
pinMode(MOTOR${motorNumber}_IN2, OUTPUT);
pinMode(MOTOR${motorNumber}_ENA, OUTPUT);
`;

  Blockly.Arduino.addSetup(`setup_motor_${motorNumber}`, setupCode, false);



  var code = "";
  return code;
};

Blockly.Arduino["control_motor"] = function (block) {
  var motorNumber = block.getFieldValue("MOTOR_NUMBER");
  var direction = block.getFieldValue("DIRECTION");
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '0';;


  // Check if setup_motor block exists before control_motor
  var setupBlocks = Blockly.getMainWorkspace().getAllBlocks().filter(function (block) {
    return block.type === "setup_motor";
  });

  if (setupBlocks.length === 0) {
    // If no setup_motor block found, show a warning
    var warningText = "You must use a Setup Motor block before Control Motor blocks!";
    block.setWarningText(warningText);
  } else {
    // Clear any previous warnings
    block.setWarningText(null);

    // Generate control_motor code
    var directionCode = "";
    if (direction === "FORWARD") {
      directionCode = `digitalWrite(MOTOR${motorNumber}_IN1, HIGH);
digitalWrite(MOTOR${motorNumber}_IN2, LOW);
`;
    } else {
      directionCode = `digitalWrite(MOTOR${motorNumber}_IN1, LOW);
digitalWrite(MOTOR${motorNumber}_IN2, HIGH);
`;
    }

    var code = `
${directionCode}analogWrite(MOTOR${motorNumber}_ENA, ${speed});
`;
    return code;
  }

  return "";
};

