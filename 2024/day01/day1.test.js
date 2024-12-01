const fs = require('fs');
const { solvePart1, solvePart2 } = require('./day1');
const { readFile } = require('../../utils/utils');

jest.mock('fs');

describe('Solution Tests', () => {
  beforeAll(() => {
    // Mock the input file
    fs.readFileSync.mockImplementation((filePath) => {
      if (filePath.endsWith('test.txt')) {
        // Exact content from test.txt
        return `3   4
4   3
2   5
1   3
3   9
3   3`;
      }
      throw new Error(`ENOENT: no such file or directory, open '${filePath}'`);
    });
  });

  // Test for Part 1
  describe('solvePart1', () => {
    test('calculates total difference correctly', () => {
      const input = readFile('test.txt');
      const result = solvePart1(input);
      expect(result).toBe(11);
    });
  });

  // Test for Part 2
  describe('solvePart2', () => {
    test('calculates total count correctly', () => {
      const input = readFile('test.txt');
      console.log(input);
      const result = solvePart2(input);
      expect(result).toBe(31);
    });
  });
});
