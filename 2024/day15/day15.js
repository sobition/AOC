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

  console.log(moves);
  console.log(grid);
  const finalDistances = getFinalBoxDistances(grid, moves);
  const sum = finalDistances.reduce(
    (acc, box) => acc + box.top * 100 + box.left,
    0
  );
  console.log(finalDistances);
  return sum;
};

///////////////////////
function getFinalBoxDistancesP2(input) {
  let grid = input[0]
    .replace(/\#/g, '##')
    .replace(/\O/g, '[]')
    .replace(/\./g, '..')
    .replace(/\@/g, '@.')
    .split(/\r?\n/)
    .map((x) => x.split(''));
  let moves = input[1].replace(/[\r\n]/g, '').split('');

  let x = null,
    y = null;
  for (let i = 0; x === null && i < grid.length; ++i) {
    for (let j = 0; j < grid[0].length; ++j) {
      if (grid[i][j] === '@') {
        x = j;
        y = i;
        break;
      }
    }
  }

  for (let move of moves) {
    const { dr, dc } = directions[move];

    let newX = x + dc;
    let newY = y + dr;

    if (grid[newY][newX] === '.') {
      grid[newY][newX] = '@';
      grid[y][x] = '.';
      y = newY;
      x = newX;
      continue;
    }
    if (grid[newY][newX] === '#') {
      continue;
    }

    let [boxL_x, boxL_y, boxR_x, boxR_y] = getBoxBounds(newY, newX);

    if (shiftBox(true, boxL_y, boxL_x, boxR_y, boxR_x, dr, dc)) {
      shiftBox(false, boxL_y, boxL_x, boxR_y, boxR_x, dr, dc);
      grid[y][x] = '.';
      grid[newY][newX] = '@';
      y = newY;
      x = newX;
    }
  }

  let result = 0;

  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[0].length; ++j) {
      if (grid[i][j] === '[') {
        result += i * 100 + j;
      }
    }
  }

  return result;

  function shiftBox(dryRun, boxL_y, boxL_x, boxR_y, boxR_x, dr, dc) {
    let q = [
      [boxL_y, boxL_x, '['],
      [boxR_y, boxR_x, ']'],
    ];
    let seen = new Set([toDp(boxL_y, boxL_x), toDp(boxR_y, boxR_x)]);

    if (!dryRun) {
      grid[boxL_y][boxL_x] = '.';
      grid[boxR_y][boxR_x] = '.';
    }

    while (q.length) {
      let [moveY, moveX, val] = q.pop();

      let newY = moveY + dr;
      let newX = moveX + dc;
      if (grid[newY][newX] === '.') {
      } else if (grid[newY][newX] === '#') {
        return false;
      } else {
        let [box2L_x, box2L_y, box2R_x, box2R_y] = getBoxBounds(newY, newX);

        if (!seen.has(toDp(box2L_y, box2L_x))) {
          seen.add(toDp(box2L_y, box2L_x));
          seen.add(toDp(box2R_y, box2R_x));

          q.push([box2L_y, box2L_x, '['], [box2R_y, box2R_x, ']']);

          if (!dryRun) {
            grid[box2L_y][box2L_x] = '.';
            grid[box2R_y][box2R_x] = '.';
          }
        }
      }

      if (!dryRun) {
        grid[newY][newX] = val;
      }
    }
    return true;
  }

  function toDp(x, y) {
    return y * grid[0].length + x;
  }

  function getBoxBounds(y, x) {
    let box2L_x, box2L_y, box2R_x, box2R_y;
    if (grid[y][x] === '[') {
      box2L_x = x;
      box2L_y = y;
    } else {
      box2L_x = x - 1;
      box2L_y = y;
    }
    box2R_x = box2L_x + 1;
    box2R_y = box2L_y;

    return [box2L_x, box2L_y, box2R_x, box2R_y];
  }
}

const solvePart2 = (input) => {
  const result = getFinalBoxDistancesP2(input);
  return result;
};

// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input
  const input = readFileSplitByEmptyLine('input.txt');

  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
