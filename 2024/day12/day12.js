const {
  readFile,
  timeIt,
  readColumns,
  isInBounds,
} = require('../../utils/utils');
const directions = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
];

function calculateRegions(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  function dfs(r, c, type) {
    let stack = [[r, c]];
    let area = 0;
    let perimeter = 0;
    const cells = new Set();

    while (stack.length > 0) {
      const [cr, cc] = stack.pop();
      if (visited[cr][cc]) continue;

      visited[cr][cc] = true;
      area++;
      cells.add(`${cr},${cc}`);

      // Check each direction
      for (const [dr, dc] of directions) {
        const nr = cr + dr;
        const nc = cc + dc;

        if (!isInBounds(rows, cols, nr, nc) || grid[nr][nc] !== type) {
          // If out of bounds or different type, it contributes to the perimeter
          perimeter++;
        } else if (!visited[nr][nc]) {
          stack.push([nr, nc]);
        }
      }
    }

    const sides = calculateSides(cells);
    return { type, area, perimeter, sides };
  }

  function calculateSides(cells) {
    const cellSet = new Set(cells);
    let sides = 0;
    for (let cell of cellSet) {
      const [x, y] = cell.split(',').map(Number);

      const up = `${x - 1},${y}`;
      const down = `${x + 1},${y}`;
      const right = `${x},${y + 1}`;
      const left = `${x},${y - 1}`;

      const ur = `${x - 1},${y + 1}`; // up-right
      const ul = `${x - 1},${y - 1}`; // up-left
      const dr = `${x + 1},${y + 1}`; // down-right
      const dl = `${x + 1},${y - 1}`; // down-left

      // External corners (two adjacent directions missing)
      if (!cellSet.has(up) && !cellSet.has(right)) sides++;
      if (!cellSet.has(right) && !cellSet.has(down)) sides++;
      if (!cellSet.has(down) && !cellSet.has(left)) sides++;
      if (!cellSet.has(left) && !cellSet.has(up)) sides++;

      // Internal corners (missing diagonal, but both adjacent cells exist)
      if (cellSet.has(up) && cellSet.has(right) && !cellSet.has(ur)) sides++;
      if (cellSet.has(right) && cellSet.has(down) && !cellSet.has(dr)) sides++;
      if (cellSet.has(down) && cellSet.has(left) && !cellSet.has(dl)) sides++;
      if (cellSet.has(left) && cellSet.has(up) && !cellSet.has(ul)) sides++;
    }

    return sides;
  }

  const results = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!visited[r][c]) {
        results.push(dfs(r, c, grid[r][c]));
      }
    }
  }

  return results;
}

const solvePart1 = (input) => {
  const garden = readColumns(input);

  const regions = calculateRegions(garden);
  const cost = regions.reduce((acc, region) => {
    return acc + region.area * region.perimeter;
  }, 0);
  return cost;
};

///////////////////////////////////////

const solvePart2 = (input) => {
  const garden = input.map((row) => row.split(''));
  const regions = calculateRegions(garden);
  const cost = regions.reduce((acc, region) => {
    return acc + region.area * region.sides;
  }, 0);
  return cost;
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
