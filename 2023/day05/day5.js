const {
  timeIt,
  readFileSplitByEmptyLine,
  stringToNumberArray,
} = require('../../utils/utils');

// Solve Part 1
const solvePart1 = (input) => {
  let [seeds, ...maps] = input;
  seeds = stringToNumberArray(seeds);

  for (let map of maps) {
    map = map
      .split('\n')
      .slice(1)
      .map((line) => line.match(/\d+/g).map(Number));
    for (let i = 0; i < seeds.length; i++) {
      const seed = seeds[i];
      for (const [dest, source, len] of map) {
        if (seed >= source && seed < source + len) {
          seeds[i] = seeds[i] - source + dest;
          break;
        }
      }
    }
  }

  return Math.min(...seeds);
};

// Solve Part 2
const solvePart2 = (input) => {
  // Write logic for Part 2 here
  let [seeds, ...maps] = input;
  seeds = seeds.match(/\d+/g).map(Number);
  const nextSeeds = [];
  for (let i = 0; i < seeds.length; i += 2) {
    nextSeeds.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
  }
  seeds = nextSeeds;
  for (let map of maps) {
    map = map
      .split('\n')
      .slice(1)
      .map((line) => line.match(/\d+/g).map(Number));

    const movedSeeds = [];
    for (const [dest, source, len] of map) {
      const unmovedSeeds = [];
      for (const [start, end] of seeds) {
        if (start < source + len && end >= source) {
          movedSeeds.push([
            Math.max(start, source) - source + dest,
            Math.min(end, source + len - 1) - source + dest,
          ]);
        }
        if (start < source) {
          unmovedSeeds.push([start, Math.min(end, source - 1)]);
        }
        if (end >= source + len) {
          unmovedSeeds.push([Math.max(start, source + len), end]);
        }
      }
      seeds = unmovedSeeds;
    }
    seeds.push(...movedSeeds);
  }
  return Math.min(...seeds.flat());
};

// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input

  const input = readFileSplitByEmptyLine('input.txt');
  // console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
