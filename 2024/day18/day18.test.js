const path = require('path');
const { solvePart1, solvePart2 } = require('./day18');
const { readFile } = require('../../utils/utils');

const input = readFile(path.resolve(__dirname, 'input.txt'));

describe('Day 18 Solutions', () => {
  test('solvePart1 should return the expected output for Part 1', () => {
    const result = solvePart1(input);
    expect(result).toBe(314);
  });

  test('solvePart2 should return the expected output for Part 2', () => {
    const result = solvePart2(input);
    expect(result).toBe('15,20');
  });
});
