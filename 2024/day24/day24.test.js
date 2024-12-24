const path = require('path');
const { solvePart1, solvePart2 } = require('./day24');
const { readFileSplitByEmptyLine } = require('../../utils/utils');

const input = readFileSplitByEmptyLine(path.resolve(__dirname, 'input.txt'));

describe('Day 24 Solutions', () => {
  test('solvePart1 should return the expected output for Part 1', () => {
    const result = solvePart1(input);
    expect(result).toBe('51107420031718');
  });

  test('solvePart2 should return the expected output for Part 2', () => {
    const result = solvePart2(input);
    expect(result).toBe('cpm,ghp,gpr,krs,nks,z10,z21,z33');
  });
});
