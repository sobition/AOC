const { readFile, timeIt, readColumns } = require('../../utils/utils');

// Solve Part 1
const solvePart1 = (input) => {
  // Write logic for Part 1 here
  const grid = input.map((row) => row.split(''));

  const rows = grid.length;
  const cols = grid[0].length;
  const word = 'XMAS';
  const directions = [
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
    [-1, 0], // Up
    [1, 1], // Diagonal Down-Right
    [1, -1], // Diagonal Down-Left
    [-1, 1], // Diagonal Up-Right
    [-1, -1], // Diagonal Up-Left
  ];

  const results = [];

  function search(x, y, direction, word) {
    let i = 0;
    let positions = [];
    let currentX = x;
    let currentY = y;

    const isValid = (x, y) => x >= 0 && x < rows && y >= 0 && y < cols;
    while (i < word.length) {
      if (
        !isValid(currentX, currentY) ||
        grid[currentX][currentY] !== word[i]
      ) {
        return null;
      }
      positions.push([currentX, currentY]);
      currentX += direction[0];
      currentY += direction[1];
      i++;
    }

    return positions;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === word[0]) {
        // Potential starting point
        for (const direction of directions) {
          const match = search(row, col, direction, word);
          if (match) {
            results.push(match);
          }
        }
      }
    }
  }

  return results.length;
  // return 'Solution for Part 1';
};

// Solve Part 2
const solvePart2 = (input) => {
  // Write logic for Part 2 here
  const grid = input.map((row) => row.split(''));

  const rows = grid.length;
  const cols = grid[0].length;

  let count = 0;
  const isValid = (x, y) => {
    return x >= 0 && x < rows && y >= 0 && y < cols;
  };

  for (let row = 1; row < rows - 1; row++) {
    for (let col = 1; col < cols - 1; col++) {
      if (grid[row][col] === 'A') {
        const topLeftM =
          isValid(row - 1, col - 1) && grid[row - 1][col - 1] === 'M';
        const topLeftS =
          isValid(row - 1, col - 1) && grid[row - 1][col - 1] === 'S';
        const bottomRightM =
          isValid(row + 1, col + 1) && grid[row + 1][col + 1] === 'M';
        const bottomRightS =
          isValid(row + 1, col + 1) && grid[row + 1][col + 1] === 'S';

        const topRightM =
          isValid(row - 1, col + 1) && grid[row - 1][col + 1] === 'M';
        const topRightS =
          isValid(row - 1, col + 1) && grid[row - 1][col + 1] === 'S';
        const bottomLeftM =
          isValid(row + 1, col - 1) && grid[row + 1][col - 1] === 'M';
        const bottomLeftS =
          isValid(row + 1, col - 1) && grid[row + 1][col - 1] === 'S';

        // check if diagonals are correct
        let diagonalCount = 0;
        if ((topLeftM && bottomRightS) || (topLeftS && bottomRightM))
          diagonalCount++;
        if ((topRightM && bottomLeftS) || (topRightS && bottomLeftM))
          diagonalCount++;

        if (diagonalCount === 2) count++;
      }
    }
  }

  return count;
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
