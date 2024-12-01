const path = require('path');
const { solvePart1, solvePart2 } = require('./day1');
const { readFile } = require('../../utils/utils');

const input = readFile(path.resolve(__dirname, 'test.txt')).filter(
  (line) => line
);

describe('Solution Tests', () => {
  // Test for Part 1
  describe('solvePart1', () => {
    test('calculates total difference correctly', () => {
      const result = solvePart1(input);
      expect(result).toBe(11);
    });
  });

  // Test for Part 2
  describe('solvePart2', () => {
    test('calculates total count correctly', () => {
      const result = solvePart2(input);
      expect(result).toBe(31);
    });
  });
});
