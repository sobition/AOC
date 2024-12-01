const { solvePart1, solvePart2 } = require('./day1');
const { readFile } = require('../../utils/utils');

jest.mock('../../utils/utils', () => {
  const originalModule = jest.requireActual('../../utils/utils');
  return {
    ...originalModule,
    readFile: jest.fn(),
  };
});

describe('Max Calories Solutions', () => {
  beforeAll(() => {
    // Mock the input file
    readFile.mockReturnValue([
      '1000',
      '2000',
      '3000',
      '',
      '4000',
      '',
      '5000',
      '6000',
      '',
      '7000',
      '8000',
      '9000',
      '',
      '10000',
      '',
    ]);
  });

  describe('solvePart1', () => {
    test('returns the maximum calories carried by a single backpacker', () => {
      const input = readFile('test.txt');
      const result = solvePart1(input);
      expect(result).toBe(24000);
    });
  });

  describe('solvePart2', () => {
    test('returns the sum of the top three maximum calories carried by backpackers', () => {
      const input = readFile('test.txt');
      console.log('iwwwnput:', input);
      const result = solvePart2(input);
      expect(result).toBe(45000);
    });
  });

  test('handles empty input', () => {
    readFile.mockReturnValue([]);
    const input = readFile('test.txt');
    expect(solvePart1(input)).toBeUndefined(); // No calories
    expect(solvePart2(input)).toBe(0); // Sum of no backpacks
  });

  test('handles single backpacker input', () => {
    readFile.mockReturnValue(['1000', '2000', '3000', '']);
    const input = readFile('test.txt');
    expect(solvePart1(input)).toBe(6000); // Single backpacker's total
    expect(solvePart2(input)).toBe(6000); // Only one backpacker
  });
});
