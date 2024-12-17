const path = require('path');
const { solvePart1, solvePart2 } = require('./day17');
const { readFileSplitByEmptyLine } = require('../../utils/utils');

const input = readFileSplitByEmptyLine(path.resolve(__dirname, 'input.txt'));

describe('Day 17 Solutions', () => {
  test('solvePart1 should return the expected output for Part 1', () => {
    const result = solvePart1(input);
    expect(result).toBe('7,1,3,7,5,1,0,3,4');
  });

  test('solvePart2 should return the expected output for Part 2', () => {
    const result = solvePart2(input);
    expect(result).toBe(190384113204239);
  });
});
