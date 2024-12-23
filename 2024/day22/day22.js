const { readFile, timeIt } = require('../../utils/utils');

const nextNumber = (secretNumber) => {
  const mask = 0xffffff;
  secretNumber = (secretNumber ^ (secretNumber << 6)) & mask;
  secretNumber = (secretNumber ^ (secretNumber >> 5)) & mask;
  secretNumber = (secretNumber ^ (secretNumber << 11)) & mask;
  return secretNumber;
};

const parseInput = (input) =>
  input.filter((line) => line.trim() !== '').map(Number);

const iterateNextNumber = (number, count) => {
  for (let i = 0; i < count; i++) {
    number = nextNumber(number);
  }
  return number;
};

const solvePart1 = (input) => {
  const startPrices = parseInput(input);
  return startPrices
    .map((secretNumber) => iterateNextNumber(secretNumber, 2000))
    .reduce((sum, num) => sum + num, 0);
};

const solvePart2 = (input) => {
  const prices = parseInput(input);
  const ranges = new Map();

  prices.forEach((secretNumber) => {
    const visited = new Set();
    const differences = [];
    let currentSecretNumber = secretNumber;

    for (let i = 0; i < 2000; i++) {
      const nextSecretNumber = nextNumber(currentSecretNumber);
      differences.push((nextSecretNumber % 10) - (currentSecretNumber % 10));
      currentSecretNumber = nextSecretNumber;

      if (differences.length === 4) {
        const key = differences.join(',');
        if (!visited.has(key)) {
          if (!ranges.has(key)) ranges.set(key, []);
          ranges.get(key).push(nextSecretNumber % 10);
          visited.add(key);
        }
        differences.shift(); // Maintain sliding window
      }
    }
  });

  return Math.max(
    ...Array.from(ranges.values()).map((range) =>
      range.reduce((sum, num) => sum + num, 0)
    )
  );
};

// Main execution function
const main = () => {
  const input = readFile('input.txt');

  // Uncomment for Part 1
  console.log('Part 1:', timeIt(solvePart1, input));

  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
