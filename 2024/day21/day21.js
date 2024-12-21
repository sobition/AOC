const { readFile, timeIt } = require('../../utils/utils');

const BFS_DIRECTIONS = {
  '^': { x: 0, y: -1 },
  '>': { x: 1, y: 0 },
  v: { x: 0, y: 1 },
  '<': { x: -1, y: 0 },
};

const KEYPAD = {
  7: { x: 0, y: 0 },
  8: { x: 1, y: 0 },
  9: { x: 2, y: 0 },
  4: { x: 0, y: 1 },
  5: { x: 1, y: 1 },
  6: { x: 2, y: 1 },
  1: { x: 0, y: 2 },
  2: { x: 1, y: 2 },
  3: { x: 2, y: 2 },
  X: { x: 0, y: 3 },
  0: { x: 1, y: 3 },
  A: { x: 2, y: 3 },
};

const DIRECTIONS = {
  X: { x: 0, y: 0 },
  '^': { x: 1, y: 0 },
  A: { x: 2, y: 0 },
  '<': { x: 0, y: 1 },
  v: { x: 1, y: 1 },
  '>': { x: 2, y: 1 },
};

// Generates all paths from one button to another on the keypad.
function getCommand(input, start, end) {
  if (start === end) return ['A']; // No movement needed

  const queue = [{ ...input[start], path: '' }];
  const distances = {};
  const allPaths = [];

  while (queue.length) {
    const current = queue.shift();
    if (!current) break;

    // Check if we reached the destination
    if (current.x === input[end].x && current.y === input[end].y) {
      allPaths.push(current.path + 'A');
      continue;
    }

    // Skip if a shorter path already exists
    const currentKey = `${current.x},${current.y}`;
    if (
      distances[currentKey] !== undefined &&
      distances[currentKey] < current.path.length
    ) {
      continue;
    }

    // Explore neighbors
    for (const [direction, vector] of Object.entries(BFS_DIRECTIONS)) {
      const position = { x: current.x + vector.x, y: current.y + vector.y };

      // Skip traversal into invalid 'X' area
      if (input.X.x === position.x && input.X.y === position.y) continue;

      // Validate the button
      const button = Object.values(input).find(
        (b) => b.x === position.x && b.y === position.y
      );
      if (button) {
        const newPath = current.path + direction;
        const positionKey = `${position.x},${position.y}`;

        if (
          !distances[positionKey] ||
          distances[positionKey] >= newPath.length
        ) {
          queue.push({ ...position, path: newPath });
          distances[positionKey] = newPath.length;
        }
      }
    }
  }

  return allPaths.sort((a, b) => a.length - b.length); // Shortest paths first
}

// Calculates the minimum key presses required to enter a code.
function getKeyPresses(input, code, robot, memo) {
  const memoKey = `${code},${robot}`;
  if (memo[memoKey] !== undefined) return memo[memoKey];

  let current = 'A';
  let totalLength = 0;

  for (const char of code) {
    const moves = getCommand(input, current, char);

    if (robot === 0) {
      totalLength += moves[0].length;
    } else {
      const costs = moves.map((move) =>
        getKeyPresses(DIRECTIONS, move, robot - 1, memo)
      );
      totalLength += Math.min(...costs);
    }

    current = char;
  }

  memo[memoKey] = totalLength;
  return totalLength;
}

const solvePart1 = (input) => {
  const memo = {};
  return input.reduce((sum, code) => {
    const numerical = parseInt(code.replace(/[^\d]/g, ''));
    return sum + numerical * getKeyPresses(KEYPAD, code, 2, memo);
  }, 0);
};

const solvePart2 = (input) => {
  const memo = {};
  return input.reduce((sum, code) => {
    const numerical = parseInt(code.replace(/[^\d]/g, ''));
    return sum + numerical * getKeyPresses(KEYPAD, code, 25, memo);
  }, 0);
};

const main = () => {
  const input = readFile('input.txt');

  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
