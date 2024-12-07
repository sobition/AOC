const { readFile, timeIt, sumArray } = require('../../utils/utils');

function countTrueEquations(equations, operators) {
  let trueEquations = [];

  function evaluateCombinations(operands, target, operators) {
    const n = operands.length - 1;
    const operatorCombinations = 3 ** n;

    for (let i = 0; i < operatorCombinations; i++) {
      let result = operands[0];
      let mask = i;

      for (let j = 0; j < n; j++) {
        const operatorIndex = mask % operators.length;
        const operator = operators[operatorIndex];

        if (operator === '+') {
          result += operands[j + 1];
        } else if (operator === '*') {
          result *= operands[j + 1];
        } else if (operator === '||') {
          result = parseInt(result.toString() + operands[j + 1].toString(), 10);
        }

        mask = Math.floor(mask / 3);
      }

      if (result === target) {
        return true;
      }
    }
    return false;
  }

  equations.forEach(({ lhs, rhs }) => {
    const target = parseInt(lhs.trim(), 10);
    const operands = rhs.trim().split(/\s+/).map(Number);

    if (evaluateCombinations(operands, target, operators)) {
      trueEquations.push(target);
    }
  });

  return trueEquations;
}

const solvePart1 = (input) => {
  const equations = input.map((line) => {
    const [lhs, rhs] = line.split(':');
    return { lhs, rhs };
  });
  const result = countTrueEquations(equations, ['+', '*']);

  const sum = sumArray(result);

  return sum;
};

const solvePart2 = (input) => {
  const equations = input.map((line) => {
    const [lhs, rhs] = line.split(':');
    return { lhs, rhs };
  });
  const result = countTrueEquations(equations, ['+', '*', '||']);
  const sum = sumArray(result);
  console.log(sum);
  return sum;
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
