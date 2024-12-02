const { readFile, timeIt } = require('../../utils/utils');

const isIncreasing = (arr) =>
  arr.every(
    (val, i, a) =>
      i === 0 || (val > a[i - 1] && val - a[i - 1] <= 3 && val - a[i - 1] >= 1)
  );

const isDecreasing = (arr) =>
  arr.every(
    (val, i, a) =>
      i === 0 || (val < a[i - 1] && a[i - 1] - val <= 3 && a[i - 1] - val >= 1)
  );
const isIncreasingOrDecreasingWithDifference = (arr) => {
  return isIncreasing(arr) || isDecreasing(arr);
};

// Solve Part 1
const solvePart1 = (input) => {
  // Write logic for Part 1 here
  const reports = input;
  let safe = 0;
  reports.forEach((level) => {
    if (isIncreasingOrDecreasingWithDifference(level.split(' ').map(Number))) {
      safe++;
    }
  });

  return safe;
};

const canBecomeValid = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const modified = arr.slice(0, i).concat(arr.slice(i + 1));
    if (isIncreasingOrDecreasingWithDifference(modified)) {
      return true;
    }
  }
  return false;
};
// Solve Part 2
const solvePart2 = (input) => {
  // Write logic for Part 2 here
  const reports = input;
  let safe = 0;

  reports.forEach((level) => {
    if (canBecomeValid(level.split(' ').map(Number))) {
      safe++;
    }
  });
  return safe;
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

module.exports = { solvePart1, solvePart2 };
