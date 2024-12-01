const { readFile, timeIt, sumArray } = require('../../utils/utils');

const maxCalories = (input) => {
  let sums = [];
  let backpacker = [];
  input.forEach((line) => {
    let calories = Number(line);
    backpacker.push(calories);

    if (calories === 0) {
      sums.push(backpacker.reduce((a, b) => a + b, 0));
      backpacker = [];
    }
  });
  return sums.sort((a, b) => b - a);
};

// Solve Part 1
const solvePart1 = (input) => {
  const sums = maxCalories(input);
  // Write logic for Part 1 here
  return sums[0];
};

// Solve Part 2
const solvePart2 = (input) => {
  // Write logic for Part 2 here
  const sums = maxCalories(input);
  return sumArray(sums.slice(0, 3));
};

// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input
  const input = readFile('test.txt');

  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { maxCalories, solvePart1, solvePart2 };
