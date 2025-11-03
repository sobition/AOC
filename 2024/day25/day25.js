const { timeIt, readFileSplitByEmptyLine } = require('../../utils/utils');

const solvePart1 = (input) => {
  const mapKeyOrLock = (desc) =>
    desc
      .split('\n')
      .map((row) => row.split('').map((char) => (char === '#' ? 1 : 0)))
      .reduce((total, row) => total.map((x, i) => x + row[i]));

  const keysAndLocks = input;
  const keys = keysAndLocks.filter((s) => s.startsWith('.')).map(mapKeyOrLock);
  const locks = keysAndLocks.filter((s) => s.startsWith('#')).map(mapKeyOrLock);

  const fitCount = keys
    .map(
      (key) =>
        locks.filter((lock) => !lock.some((x, i) => x + key[i] > 7)).length
    )
    .reduce((sum, val) => sum + val, 0);

  console.log(fitCount);
  return 'Solution for Part 1';
};

// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input
  const input = readFileSplitByEmptyLine('input.txt');

  console.log('Part 1:', timeIt(solvePart1, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1 };
