const { readFile, timeIt } = require('../../utils/utils');

function iterateStones(initialStones, iterations) {
  const numbers = initialStones.flat().map(Number);

  const cache = new Map();

  function update(stones, blinks) {
    const cacheKey = `${stones.join(',')}:${blinks}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    if (blinks === 0) {
      const count = stones.length;
      cache.set(cacheKey, count);
      return count;
    }

    let count = 0;

    for (const stone of stones) {
      if (stone === 0) {
        // Rule 1: Replace 0 with 1
        count += update([1], blinks - 1);
      } else {
        const strStone = stone.toString();
        if (strStone.length % 2 === 0) {
          // Rule 2: Even-digit length, split into two halves
          const mid = strStone.length / 2;
          const left = Number(strStone.slice(0, mid));
          const right = Number(strStone.slice(mid));
          count += update([left, right], blinks - 1);
        } else {
          // Rule 3: Multiply by 2024
          count += update([stone * 2024], blinks - 1);
        }
      }
    }

    cache.set(cacheKey, count);
    return count;
  }

  return update(numbers, iterations);
}

const solvePart1 = (input) => {
  const stones = input[0].split('\n').map((row) => row.split(' '));

  const result = iterateStones(stones[0], 25);
  return result;
};

const solvePart2 = (input) => {
  const stones = input[0].split('\n').map((row) => row.split(' '));

  const result = iterateStones(stones[0], 75);
  return result;
};

// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input
  const input = readFile('input.txt');

  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
