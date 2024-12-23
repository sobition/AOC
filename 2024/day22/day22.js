const { readFile, timeIt } = require('../../utils/utils');

const nextNumber = (secretNumber) => {
  secretNumber = (secretNumber ^ (secretNumber << 6)) & 0xffffff;
  secretNumber = (secretNumber ^ (secretNumber >> 5)) & 0xffffff;
  secretNumber = (secretNumber ^ (secretNumber << 11)) & 0xffffff;
  return secretNumber;
};

const solvePart1 = (input) => {
  const startPrices = input.filter((line) => line != '').map(Number);
  return startPrices
    .map((secretNumber) => {
      for (let i = 0; i < 2000; i++) {
        secretNumber = nextNumber(secretNumber);
      }
      return secretNumber;
    })
    .reduce((lhs, rhs) => lhs + rhs);
};

function* pairwise(iterable) {
  const iterator = iterable[Symbol.iterator]();
  let a = iterator.next();
  if (a.done) {
    return;
  }
  let b = iterator.next();
  while (!b.done) {
    yield [a.value, b.value];
    a = b;
    b = iterator.next();
  }
}

const solvePart2 = (input) => {
  console.log('input', input);
  const ranges = new Map();
  const prices = input.filter((line) => line != '').map(Number);

  prices.forEach((secretNumber) => {
    const visited = new Set();
    const differences = [];

    for (let i = 0; i < 2000; i++) {
      const nextSecretNumber = nextNumber(secretNumber);
      differences.push(Number((nextSecretNumber % 10) - (secretNumber % 10)));
      secretNumber = nextSecretNumber;

      if (differences.length === 4) {
        const key = differences.join(',');
        if (!visited.has(key)) {
          if (!ranges.has(key)) ranges.set(key, []);
          ranges.get(key).push(nextSecretNumber % 10);
          visited.add(key);
        }
        differences.shift();
      }
    }
  });

  return Math.max(
    ...Array.from(ranges.values()).map((range) =>
      range.reduce((lhs, rhs) => lhs + rhs)
    )
  );
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
