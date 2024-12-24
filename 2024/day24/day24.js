const { timeIt, readFileSplitByEmptyLine } = require('../../utils/utils');

const operations = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  XOR: (a, b) => a ^ b,
};

const parseValues = (values) => {
  return values.split('\n').reduce((acc, line) => {
    const [key, value] = line.split(': ');
    acc[key] = Number(value);
    return acc;
  }, {});
};

const parseGates = (gates) => {
  return gates.split('\n').map((line) => {
    const [func, storage] = line.split(' -> ');
    const [a, op, b] = func.split(' ');
    return { a, op, b, storage };
  });
};

const executeGates = (gatesList, valueObj) => {
  const resolveGate = ({ a, op, b, storage }) => {
    const aValue = valueObj[a];
    const bValue = valueObj[b];

    if (aValue !== undefined && bValue !== undefined) {
      valueObj[storage] = operations[op](aValue, bValue);
      return true;
    }

    if (op === 'AND' && (aValue === 0 || bValue === 0)) {
      valueObj[storage] = 0;
      return true;
    }

    if (op === 'OR' && (aValue === 1 || bValue === 1)) {
      valueObj[storage] = 1;
      return true;
    }

    return false;
  };

  return gatesList.filter((gate) => !resolveGate(gate));
};

const solvePart1 = (input) => {
  const [values, gates] = input;

  const valueObj = parseValues(values);
  let gatesList = parseGates(gates);

  while (gatesList.length > 0) {
    gatesList = executeGates(gatesList, valueObj);
  }

  const binaryResult = Object.keys(valueObj)
    .filter((key) => key.startsWith('z'))
    .sort((a, b) => Number(b.slice(1)) - Number(a.slice(1)))
    .map((key) => valueObj[key] || 0)
    .join('');

  return BigInt(`0b${binaryResult}`).toString();
};

const solvePart2 = (input) => {
  const [, gates] = input;

  const instructions = gates.split('\n').map((line) => {
    const tokens = line.split(' ');
    return {
      a: tokens[0],
      b: tokens[2],
      c: tokens[4],
      operation: tokens[1],
    };
  });

  const BIT_LENGTH = 45;
  const incorrect = [];

  const findInstruction = (criteria) => {
    return instructions.find(criteria);
  };

  for (let i = 0; i < BIT_LENGTH; i++) {
    const id = i.toString().padStart(2, '0');

    const xor1 = findInstruction(
      (inst) =>
        ((inst.a === `x${id}` && inst.b === `y${id}`) ||
          (inst.a === `y${id}` && inst.b === `x${id}`)) &&
        inst.operation === 'XOR'
    );

    const and1 = findInstruction(
      (inst) =>
        ((inst.a === `x${id}` && inst.b === `y${id}`) ||
          (inst.a === `y${id}` && inst.b === `x${id}`)) &&
        inst.operation === 'AND'
    );

    const z = findInstruction((inst) => inst.c === `z${id}`);

    if (!xor1 || !and1 || !z) continue;

    if (z.operation !== 'XOR') incorrect.push(z.c);

    const or = findInstruction(
      (inst) => inst.a === and1.c || inst.b === and1.c
    );
    if (or && or.operation !== 'OR' && i > 0) incorrect.push(and1.c);

    const after = findInstruction(
      (inst) => inst.a === xor1.c || inst.b === xor1.c
    );
    if (after && after.operation === 'OR') incorrect.push(xor1.c);
  }

  incorrect.push(
    ...instructions
      .filter(
        (inst) =>
          !['x', 'y'].includes(inst.a[0]) &&
          !['x', 'y'].includes(inst.b[0]) &&
          !inst.c.startsWith('z') &&
          inst.operation === 'XOR'
      )
      .map((inst) => inst.c)
  );

  return incorrect.sort().join(',');
};

const main = () => {
  const input = readFileSplitByEmptyLine('input.txt');

  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
