const { readFile, timeIt, stringToNumberArray } = require('../../utils/utils');

// Solve Part 1
const solvePart1 = (input) => {
  const string = input.join('');

  const regex = /mul\(\d+,\d+\)/gi;

  const multipliers = string.match(regex);

  let sum = 0;
  multipliers.forEach((multiplier) => {
    const [a, b] = multiplier.slice(4, -1).split(',').map(Number);
    sum += a * b;
  });
  return sum;
};

// Solve Part 2

const solvePart2 = (input) => {
  const string = input.join('');

  const regex = /mul\(\d+,\d+\)/gi;
  const result = string.replace(/don't\([^)]*\)[\s\S]*?do\(/g, 'do(');

  const multipliers = result.match(regex);

  let sum = 0;
  multipliers.forEach((multiplier) => {
    const [a, b] = multiplier.slice(4, -1).split(',').map(Number);
    sum += a * b;
  });

  return sum;
};

// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input
  const input = readFile('input.txt');

  // console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
