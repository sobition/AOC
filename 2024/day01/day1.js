const { readFile, readColumns, timeIt } = require('../../utils/utils');

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
const main = (filePath = 'input.txt') => {
  // Change `test.txt` to `input.txt` for full input
  const input = readFile(filePath).filter((line) => line);

  console.log('Part 1:', timeIt(solvePart1, input));
  //Part 1: 1651298
  console.log('Part 2:', timeIt(solvePart2, input));
  // Part 2: 21306195
};

module.exports = { solvePart1, solvePart2 };
// main();
if (require.main === module) {
  main();
}
