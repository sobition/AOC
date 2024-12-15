const { timeIt, readFileSplitByEmptyLine } = require('../../utils/utils');

const directions = {
  '^': { dr: -1, dc: 0 },
  v: { dr: 1, dc: 0 },
  '<': { dr: 0, dc: -1 },
  '>': { dr: 0, dc: 1 },
};

function getFinalBoxDistances(grid, movements) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  // Locate the initial position of the robot (@) and boxes (O)
  let robotPos = { row: 0, col: 0 };
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (grid[i][j] === '@') {
        robotPos = { row: i, col: j };
      }
    }
  }

  // Helper function to check if a cell is valid and not a wall (#)
  function isValid(row, col) {
    return (
      row >= 0 &&
      row < numRows &&
      col >= 0 &&
      col < numCols &&
      grid[row][col] !== '#'
    );
  }

  // Helper function to print the grid
  function printGrid() {
    console.log(grid.map((row) => row.join('')).join('\n'));
    console.log('');
  }

  // Direction mappings

  // Process each movement
  for (const move of movements) {
    const { dr, dc } = directions[move];
    const newRow = robotPos.row + dr;
    const newCol = robotPos.col + dc;

    if (isValid(newRow, newCol)) {
      if (grid[newRow][newCol] === 'O') {
        let nextRow = newRow;
        let nextCol = newCol;
        let canPush = true;
        const toMove = [];

        // Check and collect all boxes in the pushing direction
        while (canPush) {
          nextRow += dr;
          nextCol += dc;
          if (isValid(nextRow, nextCol) && grid[nextRow][nextCol] === '.') {
            toMove.push({ row: nextRow, col: nextCol });
            break;
          } else if (
            isValid(nextRow, nextCol) &&
            grid[nextRow][nextCol] === 'O'
          ) {
            toMove.push({ row: nextRow, col: nextCol });
          } else {
            canPush = false;
          }
        }

        // If we can push all boxes, move them
        if (canPush) {
          for (let i = toMove.length - 1; i >= 0; i--) {
            const { row, col } = toMove[i];
            if (i === 0) {
              grid[row][col] = 'O';
            } else {
              const prev = toMove[i - 1];
              grid[row][col] = grid[prev.row][prev.col];
            }
          }
          grid[newRow][newCol] = '@';
          grid[robotPos.row][robotPos.col] = '.';
          robotPos = { row: newRow, col: newCol };
        }
      } else if (grid[newRow][newCol] === '.') {
        // Move the robot
        grid[newRow][newCol] = '@';
        grid[robotPos.row][robotPos.col] = '.';
        robotPos = { row: newRow, col: newCol };
      }
    }
    printGrid(); // Print the grid after each move
  }

  // Calculate distances of all boxes from the top and left edges
  const boxDistances = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (grid[i][j] === 'O') {
        boxDistances.push({ top: i, left: j });
      }
    }
  }

  return boxDistances;
}

const solvePart1 = (input) => {
  const [gridInput, movesInput] = input;
  const grid = gridInput
    .trim()
    .split('\n')
    .map((row) => row.split(''));
  const moves = movesInput.replace(/\n/g, '').split('');

  const finalDistances = getFinalBoxDistances(grid, moves);
  const sum = finalDistances.reduce(
    (acc, box) => acc + box.top * 100 + box.left,
    0
  );
  console.log(finalDistances);
  return sum;
};

const solvePart2 = (input) => {
  const [gridInput, movesInput] = input;
  const grid = gridInput
    .trim()
    .split('\n')
    .map((row) => row.split(''));
  const moves = movesInput.replace(/\n/g, '').split('');

  return 'Solution for Part 2';
};

// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input
  const input = readFileSplitByEmptyLine('input.txt');

  // console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
