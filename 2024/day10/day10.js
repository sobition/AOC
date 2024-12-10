const {
  readFile,
  timeIt,
  readColumns,
  sumArray,
  isInBounds,
} = require('../../utils/utils');

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function isValidTrail(grid, rows, cols, x, y, currentValue) {
  if (!isInBounds(rows, cols, x, y)) {
    return false;
  }
  return parseInt(grid[x][y], 10) === currentValue;
}

function findTrails(grid, rows, cols, x, y, value, visited9 = null) {
  if (value === 9) {
    if (visited9 !== null) {
      const key = `${x},${y}`;
      if (!visited9.has(key)) {
        visited9.add(key); // Mark this path to this 9 as distinct
        return 1;
      }
      return 0; // Already visited this 9 via a different path
    }
    return 1; // If not tracking unique paths, simply count this path
  }

  grid[x][y] = null; // Mark as visited
  let count = 0;

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;
    if (isValidTrail(grid, rows, cols, nx, ny, value + 1)) {
      count += findTrails(grid, rows, cols, nx, ny, value + 1, visited9);
    }
  }

  grid[x][y] = value; // Restore the value after DFS
  return count;
}

function calculateTrailheadScores(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const trailheadScores = {};

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === '0') {
        const visited9 = new Set();
        const gridClone = grid.map((row) => [...row]);
        const score = findTrails(gridClone, rows, cols, i, j, 0, visited9);
        trailheadScores[`${i},${j}`] = score;
      }
    }
  }

  return trailheadScores;
}
const solvePart1 = (input) => {
  const grid = readColumns(input, 'char');
  const trailheads = calculateTrailheadScores(grid);
  const sum = sumArray(Object.values(trailheads));

  return sum;
};

function countTrailheadRating(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const trailheadRatings = {};

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === '0') {
        const gridClone = grid.map((row) => [...row]);
        const trails = findTrails(gridClone, rows, cols, i, j, 0);
        trailheadRatings[`${i},${j}`] = trails;
      }
    }
  }

  return trailheadRatings;
}

const solvePart2 = (input) => {
  const grid = readColumns(input, 'char');
  const trailheadRatings = countTrailheadRating(grid);
  const sum = sumArray(Object.values(trailheadRatings));
  return sum;
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
