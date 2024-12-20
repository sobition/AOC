const path = require('path');
const { solvePart1, solvePart2 } = require('./day7');
const { readFile } = require('../../utils/utils');

const input = readFile(path.resolve(__dirname, 'test.txt'));

describe('Day 7 Solutions', () => {
  test('solvePart1 should return the expected output for Part 1', () => {
    const result = solvePart1(input);
    expect(result).toBe(3749);
  });

  test('solvePart2 should return the expected output for Part 2', () => {
    const result = solvePart2(input);
    expect(result).toBe(11387);
  });
});
