const { timeIt, readFileSplitByEmptyLine } = require('../../utils/utils');

const findValidUpdates = (orderLines, updateLines) => {
  const validUpdates = [];
  updateLines.forEach((update) => {
    const relevantOrders = orderLines.filter(
      (order) => update.includes(order[0]) && update.includes(order[1])
    );
    const isValid = relevantOrders.every(
      (order) => update.indexOf(order[0]) < update.indexOf(order[1])
    );
    if (isValid) {
      validUpdates.push(update);
    }
  });

  return validUpdates;
};

const solvePart1 = (input) => {
  const [ordersSection, updatesSections] = input;

  const orderLines = ordersSection.split('\n').map((line) => {
    const [start, end] = line.split('|');
    return [start, end];
  });

  const updateLines = updatesSections.split('\n').map((line) => {
    return line.split(',');
  });

  const validUpdates = findValidUpdates(orderLines, updateLines);

  const sumOfMiddleItems = validUpdates.reduce((acc, curr) => {
    const middleIndex = Math.floor(curr.length / 2);
    return acc + parseInt(curr[middleIndex]);
  }, 0);

  return sumOfMiddleItems;
};

function reorderList(list, orders) {
  const relevantOrders = orders.filter(
    (order) => list.includes(order[0]) && list.includes(order[1])
  );

  return list.sort((a, b) => {
    for (const [A, B] of relevantOrders) {
      if (a === A && b === B) return -1; // A should come before B
      if (a === B && b === A) return 1; // B should come before A
    }
    return 0;
  });
}

function reorderInvalidLists(lists, orders) {
  return lists.map((list) => reorderList(list, orders));
}

// Solve Part 2
const solvePart2 = (input) => {
  const [ordersSection, updatesSections] = input;

  const orderLines = ordersSection.split('\n').map((line) => {
    const [start, end] = line.split('|');
    return [start, end];
  });

  const updateLines = updatesSections.split('\n').map((line) => {
    return line.split(',');
  });

  const validUpdates = findValidUpdates(orderLines, updateLines);
  const invalidUpdates = updateLines.filter(
    (update) => !validUpdates.includes(update)
  );

  const reorderedLists = reorderInvalidLists(invalidUpdates, orderLines);

  const sumOfMiddleItems = reorderedLists.reduce((acc, curr) => {
    const middleIndex = Math.floor(curr.length / 2);
    return acc + parseInt(curr[middleIndex]);
  }, 0);

  return sumOfMiddleItems;
};

// Main execution
const main = () => {
  const input = readFileSplitByEmptyLine('input.txt');

  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
