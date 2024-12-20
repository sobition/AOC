const { readFile, timeIt, manhattanDistance } = require('../../utils/utils');

const DIRECTIONS = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
];

const parseCoordinateKey = (key) => key.split(',').map(Number);

// Find the shortest distance from the start point to all reachable points in the grid.
const bfs = (grid, start) => {
  const width = grid[0].length;
  const height = grid.length;
  const queue = [];
  const distances = {};

  queue.push({ ...start, steps: 0 });
  distances[`${start.x},${start.y}`] = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) break;

    for (const direction of DIRECTIONS) {
      const nextX = current.x + direction.x;
      const nextY = current.y + direction.y;

      // Check boundaries and walls
      if (
        nextX < 0 ||
        nextX >= width ||
        nextY < 0 ||
        nextY >= height ||
        grid[nextY][nextX] === '#'
      ) {
        continue;
      }

      const newSteps = current.steps + 1;
      const key = `${nextX},${nextY}`;

      // Only enqueue if we found a shorter path
      if (distances[key] === undefined || distances[key] > newSteps) {
        distances[key] = newSteps;
        queue.push({ x: nextX, y: nextY, steps: newSteps });
      }
    }
  }

  return distances;
};

const findEndpoint = (grid) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === 'E') {
        return { x, y };
      }
    }
  }
  return undefined;
};

const findCheats = (grid, cheatLength, minTime) => {
  const endpoint = findEndpoint(grid);
  if (!endpoint) return 0;

  const distances = bfs(grid, endpoint);
  const walkableKeys = Object.keys(distances);

  const coordinates = walkableKeys.map(parseCoordinateKey);

  let cheats = 0;

  for (let i = 0; i < walkableKeys.length; i++) {
    const startCoord = coordinates[i];
    const startDistance = distances[walkableKeys[i]];

    for (let j = 0; j < walkableKeys.length; j++) {
      if (i === j) continue;

      const endCoord = coordinates[j];
      const endDistance = distances[walkableKeys[j]];

      const dist = manhattanDistance(startCoord, endCoord);
      // Check cheat condition
      if (
        dist <= cheatLength &&
        startDistance - endDistance - dist >= minTime
      ) {
        cheats++;
      }
    }
  }

  return cheats;
};

const solvePart1 = (input) => {
  const grid = input.map((line) => line.split(''));
  return findCheats(grid, 2, 100);
};

const solvePart2 = (input) => {
  const grid = input.map((line) => line.split(''));
  return findCheats(grid, 20, 100);
};

// Main execution
const main = () => {
  const input = readFile('input.txt');
  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
