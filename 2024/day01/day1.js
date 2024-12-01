const fs = require('fs');
const path = require('path');
const { readFile, readColumns, timeIt } = require('../../util');

// Load input (test or full)
const loadInput = (fileName) => {
  const filePath = path.join(__dirname, fileName);
  return fs.readFileSync(filePath, 'utf-8');
};

// Solve Part 1
const solvePart1 = (input) => {
  const cols = readColumns(input, 'whitespace');

  const col1 = cols[0].map(Number).sort((a, b) => a - b);
  const col2 = cols[1].map(Number).sort((a, b) => a - b);
  let totalDifference = 0;
  for (let i = 0; i < Math.min(col1.length, col2.length); i++) {
    totalDifference += Math.abs(col1[i] - col2[i]);
  }
  return totalDifference;
};

// Solve Part 2
const solvePart2 = (input) => {
  const cols = readColumns(input, 'whitespace');

  const col1 = cols[0];
  const col2 = cols[1];

  const frequencyMap = col2.reduce((map, number) => {
    map[number] = (map[number] || 0) + 1;
    return map;
  }, {});
  const totalCount = col1.reduce((sum, number) => {
    return sum + number * (frequencyMap[number] || 0);
  }, 0);
  return totalCount;
};

// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input
  const input = readFile('input.txt');

  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

main();
