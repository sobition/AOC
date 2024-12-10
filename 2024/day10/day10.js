const {
  readFile,
  timeIt,
  readColumns,
  sumArray,
  isInBounds,
} = require('../../utils/utils');

function calculateTrailheadScores(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
  ];
  const trailheadScores = {};

  // Helper function to validate a trail
  function isValidTrail(x, y, currentValue) {
    if (!isInBounds(rows, cols, x, y)) {
      return false; // Out of bounds or already visited
    }
    return parseInt(grid[x][y], 10) === currentValue;
  }

  // DFS function to count full paths to 9s
  function dfs(x, y, value, visited9) {
    if (value === 9) {
      const key = `${x},${y}`;
      if (!visited9.has(key)) {
        visited9.add(key); // Mark this path to this 9 as distinct
        return 1;
      }
      return 0; // Already visited this 9 via a different path
    }

    grid[x][y] = null; // Mark as visited
    let count = 0;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (isValidTrail(nx, ny, value + 1)) {
        count += dfs(nx, ny, value + 1, visited9);
      }
    }

    grid[x][y] = value; // Restore the value after DFS
    return count;
  }

  // Main logic to calculate scores for each trailhead
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === '0') {
        const visited9 = new Set(); // Track unique 9s reachable
        const gridClone = grid.map((row) => [...row]); // Clone the grid
        const score = dfs(i, j, 0, visited9); // Start DFS
        trailheadScores[`${i},${j}`] = score;
        grid = gridClone; // Restore the grid for the next trailhead
      }
    }
  }

  return trailheadScores;
}
const solvePart1 = (input) => {
  const grid = readColumns(input, 'char');
  const trailheads = calculateTrailheadScores(grid);
  const sum = sumArray(Object.values(trailheads));

  console.log(sum);
  return 'Solution for Part 1';
};

function countTrailheads(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
  ];
  const trailheadCounts = {};

  // Helper function to validate a trail
  function isValidTrail(x, y, currentValue) {
    if (x < 0 || x >= rows || y < 0 || y >= cols || grid[x][y] === null) {
      return false; // Out of bounds or already visited
    }
    return parseInt(grid[x][y], 10) === currentValue;
  }

  // DFS function to explore all unique trails
  function dfs(x, y, value) {
    if (value === 9) return 1; // Reached the end of the trail
    grid[x][y] = null; // Mark as visited
    let count = 0;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (isValidTrail(nx, ny, value + 1)) {
        count += dfs(nx, ny, value + 1);
      }
    }

    grid[x][y] = value; // Restore the value after DFS
    return count;
  }

  // Main logic to count trails for each '0'
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === '0') {
        const gridClone = grid.map((row) => [...row]); // Clone the grid
        const trails = dfs(i, j, 0); // Start from the current '0'
        trailheadCounts[`${i},${j}`] = trails;
        grid = gridClone; // Restore the grid
      }
    }
  }

  return trailheadCounts;
}

const solvePart2 = (input) => {
  const grid = readColumns(input, 'char');
  const trailheads = countTrailheads(grid);
  const sum = sumArray(Object.values(trailheads));
  console.log(sum);
  return 'Solution for Part 2';
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
