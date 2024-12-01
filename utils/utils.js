const fs = require('fs');

const readFile = (filePath) => {
  const allFileContents = fs.readFileSync(filePath, 'utf-8');
  return allFileContents.split(/\r?\n/);
};

const readColumns = (array, splitBy = 'char') => {
  // Split rows based on the 'splitBy' parameter
  const rows = array.map((row) =>
    splitBy === 'whitespace' ? row.split(/\s+/) : row.split('')
  );

  // Initialize columns array
  const columns = [];
  const numCols = rows[0].length;

  // Extract columns
  for (let i = 0; i < numCols; i++) {
    columns.push(rows.map((row) => row[i]));
  }

  return columns;
};

const sumArray = (array) => {
  return array.reduce((acc, curr) => acc + curr, 0);
};

// Input Parsing Utilities
const parseInput = (input) => input.trim().split('\n');
const parseNumbers = (input) => input.trim().split('\n').map(Number);
const parseCommaSeparatedNumbers = (input) =>
  input.trim().split(',').map(Number);

// Array Utilities
const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const getPermutations = (arr) => {
  if (arr.length <= 1) return [arr];
  return arr.flatMap((val, i) =>
    getPermutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((perm) => [
      val,
      ...perm,
    ])
  );
};

const getCombinations = (arr, length) => {
  if (length === 1) return arr.map((val) => [val]);
  return arr.flatMap((val, i) =>
    getCombinations(arr.slice(i + 1), length - 1).map((combo) => [
      val,
      ...combo,
    ])
  );
};

// String Utilities
const countChar = (str, char) => [...str].filter((c) => c === char).length;
const isPalindrome = (str) => str === str.split('').reverse().join('');

// Graph Utilities
const createGraph = (edges) => {
  const graph = {};
  for (const [a, b] of edges) {
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }
  return graph;
};
const dfs = (graph, start, visited = new Set()) => {
  if (visited.has(start)) return;
  visited.add(start);
  for (const neighbor of graph[start]) {
    dfs(graph, neighbor, visited);
  }
  return visited;
};

// Math Utilities
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);
const primeFactors = (n) => {
  const factors = [];
  for (let i = 2; i * i <= n; i++) {
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
  }
  if (n > 1) factors.push(n);
  return factors;
};

// Matrix Utilities
const createMatrix = (rows, cols, fill = 0) =>
  Array.from({ length: rows }, () => Array(cols).fill(fill));
const transposeMatrix = (matrix) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
const rotateMatrix = (matrix) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]).reverse());

// Search Utilities
const binarySearch = (arr, target) => {
  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
};

// Miscellaneous Utilities
const mod = (n, m) => ((n % m) + m) % m;
const manhattanDistance = ([x1, y1], [x2, y2]) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);

const timeIt = (func, ...args) => {
  const start = new Date();
  const result = func(...args);
  const end = new Date();
  console.log(`Execution time: ${end - start}ms`);
  return result;
};

module.exports = {
  readFile,
  readColumns,
  sumArray,
  timeIt,
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
};
