const { timeIt, readFileSplitByEmptyLine } = require('../../utils/utils');

function runProgram(initialRegisters, program) {
  let [A, B, C] = initialRegisters;
  let output = [];

  let ip = 0;

  function comboValue(operand) {
    // Combo operands: 0-3 are literal (0-3), 4=A, 5=B, 6=C, 7=invalid
    if (operand >= 0 && operand <= 3) return operand;
    if (operand === 4) return A;
    if (operand === 5) return B;
    if (operand === 6) return C;
    // operand 7 should never appear in a valid program
    throw new Error('Invalid combo operand 7 encountered.');
  }

  function literalValue(operand) {
    return operand;
  }

  while (ip < program.length) {
    if (ip + 1 >= program.length) break;

    const opcode = program[ip];
    const operand = program[ip + 1];

    let advanceIP = true;

    switch (opcode) {
      case 0: // adv
        // adv: A = floor(A / (2^(combo operand)))
        A = Math.floor(A / 2 ** comboValue(operand));
        break;

      case 1: // bxl
        // bxl: B = B XOR literal operand
        B = B ^ literalValue(operand);
        break;

      case 2: // bst
        // bst: B = (comboValue(operand) % 8)
        B = comboValue(operand) & 7; // %8 same as & 7 since it's 3 bits
        break;

      case 3: // jnz
        // jnz: if A != 0, ip = literal operand
        if (A !== 0) {
          ip = literalValue(operand);
          advanceIP = false;
        }
        break;

      case 4: // bxc
        // bxc: B = B XOR C (operand ignored)
        B = B ^ C;
        break;

      case 5: // out
        // out: output comboValue(operand) % 8
        output.push((comboValue(operand) & 7).toString());
        break;

      case 6: // bdv
        // bdv: B = floor(A / (2^(combo operand)))
        B = Math.floor(A / 2 ** comboValue(operand));
        break;

      case 7: // cdv
        // cdv: C = floor(A / (2^(combo operand)))
        C = Math.floor(A / 2 ** comboValue(operand));
        break;

      default:
        // Invalid opcode halts
        return output.join(',');
    }

    if (advanceIP) {
      ip += 2; // move to next opcode
    }
  }

  return output.join(',');
}
const solvePart1 = (input) => {
  const [registersInput, opcodesInput] = input;
  const registers = registersInput
    .split('\n')
    .map((line) => line.split(': '))
    .map(([_, value]) => Number(value));
  const opcodes = opcodesInput.split(': ')[1].split(',').map(Number);

  const output = runProgram(registers, opcodes);
  return output;
};

function findInitialA(nextVal, opcodes, registers, i = opcodes.length - 1) {
  if (i < 0) return nextVal;

  const [_, initialB, initialC] = registers; // Extract B and C from the given registers

  for (let aVal = nextVal * 8; aVal < nextVal * 8 + 8; aVal++) {
    // console.log('Expected:', opcodes[i]);
    // console.log('Trying A=', aVal);
    const outputStr = runProgram([aVal, initialB, initialC], opcodes);
    // console.log('Output:', outputStr);
    const outputArr = outputStr ? outputStr.split(',').map(Number) : [];

    // console.log('Output:', outputArr[0], 'Expected:', opcodes[i]);
    if (outputArr[0] === opcodes[i]) {
      // console.log('Found A:', aVal);
      // console.log('---------------------');
      const finalVal = findInitialA(aVal, opcodes, registers, i - 1);
      // console.log('Final Val:', finalVal);
      // console.log('---------------------');
      if (finalVal >= 0) return finalVal; // Found a valid A down the chain
    }
  }

  return -1;
}

function findA(opcodes, registers) {
  // Initiate the search with nextVal=0 starting from the last output index
  return findInitialA(0, opcodes, registers, opcodes.length - 1);
}

// Update solvePart2 to use findA:
const solvePart2 = (input) => {
  const [registersInput, opcodesInput] = input;
  const registers = registersInput
    .split('\n')
    .map((line) => line.split(': '))
    .map(([_, value]) => Number(value));
  const opcodes = opcodesInput.split(': ')[1].split(',').map(Number);

  const A = findA(opcodes, registers);
  return A;
};

// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input
  const input = readFileSplitByEmptyLine('input.txt');

  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
