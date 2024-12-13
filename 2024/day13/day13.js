const {
  timeIt,
  readFileSplitByEmptyLine,
  sumArray,
} = require('../../utils/utils');

const parseConfigs = (configurations, offset = 0) => {
  return configurations.map((config) => {
    // Parse button movements and prize coordinates
    const buttonAMove = config[0]
      .match(/X\+(\d+), Y\+(\d+)/)
      .slice(1)
      .map(Number);
    const buttonBMove = config[1]
      .match(/X\+(\d+), Y\+(\d+)/)
      .slice(1)
      .map(Number);
    const prizeCoords = config[2]
      .match(/X=(\d+), Y=(\d+)/)
      .slice(1)
      .map((item) => Number(item) + offset);

    return [buttonAMove, buttonBMove, prizeCoords];
  });
};

function extendedGCD(a, b) {
  if (b === 0) {
    return a;
  }
  return extendedGCD(b, a % b);
}

function solveForTwoDimensions(Ax, Ay, Bx, By, Gx, Gy) {
  const gcdX = extendedGCD(Ax, Bx);

  if (Gx % gcdX !== 0) {
    // No solution on x dimension
    return null;
  }

  const gcdY = extendedGCD(Ay, By);

  if (Gy % gcdY !== 0) {
    // No solution on y dimension
    return null;
  }

  const det = Ax * By - Ay * Bx;
  if (det === 0) {
    return null;
  }

  // Cramer's rule:
  const mSol = (Gx * By - Gy * Bx) / det;
  const nSol = (Gy * Ax - Gx * Ay) / det;

  if (!Number.isInteger(mSol) || !Number.isInteger(nSol)) {
    return null;
  }

  if (mSol < 0 || nSol < 0) {
    return null;
  }

  return { m: mSol, n: nSol };
}

function findMinimalCostForConfigs(configs) {
  return configs.map(([moveA, moveB, goal]) => {
    const [Ax, Ay] = moveA;
    const [Bx, By] = moveB;
    const [Gx, Gy] = goal;

    const result = solveForTwoDimensions(Ax, Ay, Bx, By, Gx, Gy);
    if (result === null) {
      return NaN;
    } else {
      return result.m * 3 + result.n;
    }
  });
}

const solvePart1 = (input) => {
  const configs = input.map((line) => line.split('\n'));
  const configurations = parseConfigs(configs);
  const minimalPresses = findMinimalCostForConfigs(configurations);
  const sum = sumArray(minimalPresses.filter((cost) => !isNaN(cost)));
  return sum;
};

const solvePart2 = (input) => {
  const configs = input.map((line) => line.split('\n'));
  const offset = 10000000000000;
  const configurations = parseConfigs(configs, offset);
  const minimalPresses = findMinimalCostForConfigs(configurations);
  const sum = sumArray(minimalPresses.filter((cost) => !isNaN(cost)));
  return sum;
};

// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input
  const input = readFileSplitByEmptyLine('input.txt');

  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
