const {
  timeIt,
  readFileSplitByEmptyLine,
  sumArray,
} = require('../../utils/utils');

function countFormations(target, parts) {
  const n = target.length;
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= n; i++) {
    for (const part of parts) {
      const plen = part.length;
      if (i - plen >= 0 && dp[i - plen] > 0) {
        if (target.slice(i - plen, i) === part) {
          dp[i] += dp[i - plen];
        }
      }
    }
  }

  return dp[n];
}

function canBeFormed(target, parts) {
  return countFormations(target, parts) > 0;
}

function findUnformableItems(parts, targets) {
  return targets.filter((target) => !canBeFormed(target, parts));
}

const solvePart1 = (input) => {
  const [availablePatternsInput, desiredPatternsInput] = input;
  const availablePatterns = availablePatternsInput.split(', ');
  const desiredPatterns = desiredPatternsInput.split('\n');
  const impossibleItems = findUnformableItems(
    availablePatterns,
    desiredPatterns
  );
  return desiredPatterns.length - impossibleItems.length;
};

function countWaysForAllTargets(parts, targets) {
  return targets.reduce((acc, target) => {
    acc[target] = countFormations(target, parts);
    return acc;
  }, {});
}

const solvePart2 = (input) => {
  const [availablePatternsInput, desiredPatternsInput] = input;
  const availablePatterns = availablePatternsInput.split(', ');
  const desiredPatterns = desiredPatternsInput.split('\n');
  const ways = countWaysForAllTargets(availablePatterns, desiredPatterns);
  const count = sumArray(Object.values(ways));
  return count;
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
