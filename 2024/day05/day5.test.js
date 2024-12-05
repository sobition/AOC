const path = require('path');
const { solvePart1, solvePart2 } = require('./day5');
const { readFile, readFileSplitByEmptyLine } = require('../../utils/utils');

const input = readFileSplitByEmptyLine(path.resolve(__dirname, 'input.txt'));

describe('Day 5 Solutions', () => {
  test('solvePart1 should return the expected output for Part 1', () => {
    const result = solvePart1(input);
    expect(result).toBe(6384);
  });

  test('solvePart2 should return the expected output for Part 2', () => {
    const result = solvePart2(input);
    expect(result).toBe(5353);
  });
});
