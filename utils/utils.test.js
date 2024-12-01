const {
  readColumns,
  sumArray,
  parseInput,
  parseNumbers,
  parseCommaSeparatedNumbers,
  range,
  getPermutations,
  getCombinations,
  countChar,
  isPalindrome,
  createGraph,
  dfs,
  gcd,
  lcm,
  primeFactors,
  createMatrix,
  transposeMatrix,
  rotateMatrix,
  binarySearch,
  mod,
  manhattanDistance,
} = require('./utils');

describe('Utility Functions', () => {
  // Testing readColumns
  test('readColumns splits by characters', () => {
    const input = ['abc', 'def', 'ghi'];
    const result = readColumns(input);
    expect(result).toEqual([
      ['a', 'd', 'g'],
      ['b', 'e', 'h'],
      ['c', 'f', 'i'],
    ]);
  });

  test('readColumns splits by whitespace', () => {
    const input = ['1 2 3', '4 5 6', '7 8 9'];
    const result = readColumns(input, 'whitespace');
    expect(result).toEqual([
      ['1', '4', '7'],
      ['2', '5', '8'],
      ['3', '6', '9'],
    ]);
  });

  // Testing sumArray
  test('sumArray sums all elements', () => {
    const input = [1, 2, 3, 4];
    const result = sumArray(input);
    expect(result).toBe(10);
  });

  // Testing input parsing
  test('parseInput trims and splits by newline', () => {
    const input = '1\n2\n3\n';
    const result = parseInput(input);
    expect(result).toEqual(['1', '2', '3']);
  });

  test('parseNumbers converts to numbers', () => {
    const input = '1\n2\n3\n';
    const result = parseNumbers(input);
    expect(result).toEqual([1, 2, 3]);
  });

  test('parseCommaSeparatedNumbers splits and converts', () => {
    const input = '1,2,3';
    const result = parseCommaSeparatedNumbers(input);
    expect(result).toEqual([1, 2, 3]);
  });

  // Testing range
  test('range generates a range of numbers', () => {
    const result = range(1, 5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  // Testing getPermutations
  test('getPermutations generates all permutations', () => {
    const result = getPermutations([1, 2]);
    expect(result).toEqual([
      [1, 2],
      [2, 1],
    ]);
  });

  // Testing getCombinations
  test('getCombinations generates combinations', () => {
    const result = getCombinations([1, 2, 3], 2);
    expect(result).toEqual([
      [1, 2],
      [1, 3],
      [2, 3],
    ]);
  });

  // Testing countChar
  test('countChar counts occurrences of a character', () => {
    const result = countChar('hello', 'l');
    expect(result).toBe(2);
  });

  // Testing isPalindrome
  test('isPalindrome checks for palindromes', () => {
    expect(isPalindrome('racecar')).toBe(true);
    expect(isPalindrome('hello')).toBe(false);
  });

  // Testing graph utilities
  test('createGraph creates adjacency list', () => {
    const edges = [
      ['A', 'B'],
      ['B', 'C'],
    ];
    const result = createGraph(edges);
    expect(result).toEqual({
      A: ['B'],
      B: ['A', 'C'],
      C: ['B'],
    });
  });

  test('dfs traverses the graph', () => {
    const graph = {
      A: ['B', 'C'],
      B: ['A', 'D'],
      C: ['A', 'D'],
      D: ['B', 'C'],
    };
    const visited = dfs(graph, 'A');
    expect(Array.from(visited)).toEqual(['A', 'B', 'D', 'C']);
  });

  // Testing gcd and lcm
  test('gcd calculates greatest common divisor', () => {
    expect(gcd(12, 8)).toBe(4);
  });

  test('lcm calculates least common multiple', () => {
    expect(lcm(12, 8)).toBe(24);
  });

  // Testing primeFactors
  test('primeFactors finds prime factors', () => {
    expect(primeFactors(12)).toEqual([2, 2, 3]);
  });

  // Testing matrix utilities
  test('createMatrix creates an empty matrix', () => {
    const result = createMatrix(2, 2, 0);
    expect(result).toEqual([
      [0, 0],
      [0, 0],
    ]);
  });

  test('transposeMatrix transposes a matrix', () => {
    const result = transposeMatrix([
      [1, 2],
      [3, 4],
    ]);
    expect(result).toEqual([
      [1, 3],
      [2, 4],
    ]);
  });

  test('rotateMatrix rotates a matrix 90 degrees', () => {
    const result = rotateMatrix([
      [1, 2],
      [3, 4],
    ]);
    expect(result).toEqual([
      [3, 1],
      [4, 2],
    ]);
  });

  // Testing binarySearch
  test('binarySearch finds the index of a target', () => {
    const result = binarySearch([1, 2, 3, 4, 5], 3);
    expect(result).toBe(2);
  });

  test('binarySearch returns -1 if not found', () => {
    const result = binarySearch([1, 2, 3, 4, 5], 6);
    expect(result).toBe(-1);
  });

  // Testing mod
  test('mod calculates correct modulus', () => {
    expect(mod(-1, 3)).toBe(2);
  });

  // Testing manhattanDistance
  test('manhattanDistance calculates distance', () => {
    expect(manhattanDistance([0, 0], [3, 4])).toBe(7);
  });
});
