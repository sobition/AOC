const { readFile, timeIt } = require('../../utils/utils');

function parseCoordinates(coordinates) {
  return coordinates.map((coord) => coord.split(',').map(Number));
}

function determineGridSize(coords, limit, givenSize) {
  if (typeof givenSize !== 'undefined') return givenSize;

  let maxX = 0,
    maxY = 0;
  for (let i = 0; i <= limit; i++) {
    const [x, y] = coords[i];
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  return Math.max(maxX, maxY) + 1;
}

function initializeGrid(size, coords, limit) {
  const grid = Array.from({ length: size }, () => Array(size).fill('.'));
  for (let i = 0; i <= limit; i++) {
    const [x, y] = coords[i];
    if (x < size && y < size) grid[y][x] = '#';
  }
  return grid;
}

function createGrid(coordinates, endIndex, size) {
  const coords = parseCoordinates(coordinates);
  const limit =
    typeof endIndex === 'number' && endIndex < coordinates.length
      ? endIndex
      : coordinates.length - 1;
  const gridSize = determineGridSize(coords, limit, size);
  return initializeGrid(gridSize, coords, limit);
}

function findBestPath(grid) {
  const size = grid.length;
  const target = [size - 1, size - 1];
  if (grid[0][0] === '#' || grid[target[1]][target[0]] === '#') return null;

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const queue = [[0, 0]];
  const visited = Array.from({ length: size }, () => Array(size).fill(false));
  const parent = Array.from({ length: size }, () => Array(size).fill(null));

  visited[0][0] = true;

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    if (x === target[0] && y === target[1]) {
      const path = [];
      let current = [x, y];
      while (current) {
        path.push(current);
        current = parent[current[1]][current[0]];
      }
      return path.reverse();
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx,
        ny = y + dy;
      if (
        nx >= 0 &&
        nx < size &&
        ny >= 0 &&
        ny < size &&
        grid[ny][nx] === '.' &&
        !visited[ny][nx]
      ) {
        queue.push([nx, ny]);
        visited[ny][nx] = true;
        parent[ny][nx] = [x, y];
      }
    }
  }

  return null;
}

const solvePart1 = (input) => {
  const grid = createGrid(input, 1024);
  const path = findBestPath(grid);
  return path ? path.length - 1 : null;
};

function findSmallestEndIndex(coordinates, size) {
  const coords = parseCoordinates(coordinates);

  function isPathPossible(grid) {
    return findBestPath(grid) !== null;
  }

  let low = 0,
    high = coords.length - 1,
    result = coords.length;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const grid = initializeGrid(size, coords, mid);
    if (isPathPossible(grid)) {
      low = mid + 1;
    } else {
      result = mid;
      high = mid - 1;
    }
  }

  return result;
}

const solvePart2 = (input) => {
  const smallestEndIndex = findSmallestEndIndex(input, 1025);
  return input[smallestEndIndex];
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
