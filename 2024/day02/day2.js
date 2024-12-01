const { readFile, timeIt } = require('../../util');

// Solve Part 1
const solvePart1 = (input) => {
  // Write logic for Part 1 here
  return 'Solution for Part 1';
};

// Solve Part 2
const solvePart2 = (input) => {
  // Write logic for Part 2 here
  return 'Solution for Part 2';
};

// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input
  const input = readFile('input.txt');

  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

main();
