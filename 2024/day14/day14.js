const { readFile, timeIt } = require('../../utils/utils');

const [width, height] = [101, 103];

function wrap(value, size) {
  return ((value % size) + size) % size;
}

function parseRobotSpec(spec) {
  const parts = spec.trim().split(' ');

  const pPart = parts.find((part) => part.startsWith('p='));
  const [px, py] = pPart.slice(2).split(',').map(Number);

  const vPart = parts.find((part) => part.startsWith('v='));
  const [vx, vy] = vPart.slice(2).split(',').map(Number);

  return { x: px, y: py, vx, vy };
}

function predictPositions(robotSpecs, t) {
  return robotSpecs.map((spec) => {
    const { x, y, vx, vy } = parseRobotSpec(spec);

    const newX = wrap(x + vx * t, width);
    const newY = wrap(y + vy * t, height);

    return { x: newX, y: newY };
  });
}

function countRobotsInQuadrants(predictedPositions) {
  const middleCol = Math.floor(width / 2); // For width=11, this is 5
  const middleRow = Math.floor(height / 2); // For height=7, this is 3

  let topLeft = 0;
  let topRight = 0;
  let bottomLeft = 0;
  let bottomRight = 0;

  for (const { x, y } of predictedPositions) {
    // Skip if on the middle line
    if (x === middleCol || y === middleRow) {
      continue;
    }

    if (x < middleCol && y < middleRow) {
      topLeft++;
    } else if (x > middleCol && y < middleRow) {
      topRight++;
    } else if (x < middleCol && y > middleRow) {
      bottomLeft++;
    } else if (x > middleCol && y > middleRow) {
      bottomRight++;
    }
  }

  return {
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  };
}

function printGrid(predictedPositions) {
  const grid = Array.from({ length: height }, () => Array(width).fill('.'));

  for (const { x, y } of predictedPositions) {
    grid[y][x] = 'R'; // Mark robot positions as 'R'
  }

  for (const row of grid) {
    console.log(row.join(' '));
  }
}

const solvePart1 = (input) => {
  const t = 100;
  const positionsAfterT = predictPositions(input, t);
  const counts = countRobotsInQuadrants(positionsAfterT);

  const multiply =
    counts.topLeft * counts.topRight * counts.bottomLeft * counts.bottomRight;
  return multiply;
};

function areRobotsInUniquePositions(robotsSpecs, t) {
  const predictedPositions = predictPositions(robotsSpecs, t, width, height);

  const positionsSet = new Set();

  for (const { x, y } of predictedPositions) {
    const positionKey = `${x},${y}`;
    if (positionsSet.has(positionKey)) {
      return false;
    }
    positionsSet.add(positionKey);
  }

  printGrid(predictedPositions);
  return true;
}

const solvePart2 = (input) => {
  let t = 0;

  while (!areRobotsInUniquePositions(input, t)) {
    t++;
  }

  return t;
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
