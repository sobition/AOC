const path = require('path');
const { solvePart1, solvePart2 } = require('./day5');
const { readFileSplitByEmptyLine } = require('../../utils/utils');

const input = readFileSplitByEmptyLine(path.resolve(__dirname, 'test.txt'));

describe('Day 5 Solutions', () => {
  test('solvePart1 should return the expected output for Part 1', () => {
    const result = solvePart1(input);
    expect(result).toBe(35); // Replace with actual expected result
  });

  test('solvePart2 should return the expected output for Part 2', () => {
    const result = solvePart2(input);
    expect(result).toBe(46); // Replace with actual expected result
  });
});
