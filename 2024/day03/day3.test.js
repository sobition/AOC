const path = require('path');
const { solvePart1, solvePart2 } = require('./day3');
const { readFile } = require('../../utils/utils');

const input = readFile(path.resolve(__dirname, 'input.txt'));

describe('Day 3 Solutions', () => {
  test('solvePart1 should return the expected output for Part 1', () => {
    const result = solvePart1(input);
    expect(result).toBe(167650499); // Replace with actual expected result
  });

  test('solvePart2 should return the expected output for Part 2', () => {
    const result = solvePart2(input);
    expect(result).toBe(95846796); // Replace with actual expected result
  });
});
