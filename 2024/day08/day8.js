const { readFile, timeIt, isInBounds } = require('../../utils/utils');

const findAllAntennas = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const antennas = {};
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = grid[r][c];
      if (cell !== '.') {
        if (!antennas[cell]) antennas[cell] = [];
        antennas[cell].push([r, c]);
      }
    }
  }
  return antennas;
};

const findAntinodes = (grid, type) => {
  const rows = grid.length;
  const cols = grid[0].length;
  let antinodeCount = 0;

  const markAntinode = (x, y) => {
    if (isInBounds(rows, cols, x, y)) {
      if (grid[x][y] === '.' || grid[x][y] !== '#') {
        grid[x][y] = '#';
        antinodeCount++;
      }
    }
  };

  const antennas = findAllAntennas(grid);

  // Process all pairs of antennas of the same type
  for (const [, positions] of Object.entries(antennas)) {
    const n = positions.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) continue; // Skip pairing the same antenna

        const [x1, y1] = positions[i];
        const [x2, y2] = positions[j];

        if (type === 'mirror') {
          const antinodeX = x1 + (x1 - x2);
          const antinodeY = y1 + (y1 - y2);

          markAntinode(antinodeX, antinodeY);
        } else if (type === 'all') {
          const dx = x2 - x1;
          const dy = y2 - y1;

          // Generate antinodes in both directions along the line
          for (let k = 1; k < Math.max(rows, cols); k++) {
            // Forward direction
            const antinodeX1 = x1 + dx * k;
            const antinodeY1 = y1 + dy * k;
            markAntinode(antinodeX1, antinodeY1);

            // Backward direction
            const antinodeX2 = x1 - dx * k;
            const antinodeY2 = y1 - dy * k;
            markAntinode(antinodeX2, antinodeY2);
          }
        }
      }
    }
  }

  return { grid, antinodeCount };
};

const solvePart1 = (input) => {
  const grid = input.map((line) => line.split(''));
  const { grid: outputGrid, antinodeCount } = findAntinodes(grid, 'mirror');

  // outputGrid.forEach((row) => console.log(row.join('')));
  return antinodeCount;
};

const solvePart2 = (input) => {
  const grid = input.map((line) => line.split(''));

  const { grid: outputGrid, antinodeCount } = findAntinodes(grid, 'all');
  // outputGrid.forEach((row) => console.log(row.join('')));
  return antinodeCount;
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
