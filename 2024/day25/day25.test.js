const path = require('path');
const { solvePart1 } = require('./day25');
const { readFile } = require('../../utils/utils');

const input = readFile(path.resolve(__dirname, 'input.txt'));

describe('Day 25 Solutions', () => {
  test('solvePart1 should return the expected output for Part 1', () => {
    const result = solvePart1(input);
    expect(result).toBe(3090);
  });
});
