const readline = require('readline');
const { readFile, timeIt } = require('../../utils/utils');

const directions = ['^', '>', 'v', '<'];
const deltas = { '^': [-1, 0], '>': [0, 1], v: [1, 0], '<': [0, -1] };

function findStartingPosition(map) {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (directions.includes(map[row][col])) {
        return { startX: row, startY: col, direction: map[row][col] };
      }
    }
  }
  return null;
}

function move(map, x, y, direction) {
  const [dx, dy] = deltas[direction];
  const nextX = x + dx;
  const nextY = y + dy;

  const isOutOfBounds =
    nextX < 0 || nextX >= map.length || nextY < 0 || nextY >= map[0].length;

  if (isOutOfBounds) {
    return { x, y, direction, isOutOfBounds: true };
  }

  if (map[nextX][nextY] === '#') {
    const currentIndex = directions.indexOf(direction);
    direction = directions[(currentIndex + 1) % 4];
  } else {
    x = nextX;
    y = nextY;
  }

  return { x, y, direction, isOutOfBounds: false };
}

function countUniqueVisitedPlaces(map) {
  const newMap = map.map((row) => [...row]);
  const startPosition = findStartingPosition(map);

  if (!startPosition) {
    return 0;
  }

  let { startX, startY, direction } = startPosition;
  let x = startX;
  let y = startY;
  const visited = new Set();
  visited.add(`${x},${y}`);
  newMap[x][y] = 'x';

  while (true) {
    const {
      x: nextX,
      y: nextY,
      direction: nextDirection,
      isOutOfBounds,
    } = move(map, x, y, direction);

    if (isOutOfBounds) {
      break;
    }

    x = nextX;
    y = nextY;
    direction = nextDirection;

    const position = `${x},${y}`;
    if (!visited.has(position)) {
      visited.add(position);
      newMap[x][y] = 'x';
    }
  }

  return visited.size;
}

const solvePart1 = (input) => {
  const map = input.map((line) => line.split(''));
  const result = countUniqueVisitedPlaces(map);
  return result;
};

function simulate(map) {
  const startPosition = findStartingPosition(map);

  if (!startPosition) {
    return false;
  }

  let { startX, startY, direction } = startPosition;
  let x = startX;
  let y = startY;
  const visited = new Set();
  visited.add(`${x},${y},${direction}`);

  while (true) {
    const {
      x: nextX,
      y: nextY,
      direction: nextDirection,
      isOutOfBounds,
    } = move(map, x, y, direction);

    if (isOutOfBounds) {
      return false;
    }

    x = nextX;
    y = nextY;
    direction = nextDirection;

    const state = `${x},${y},${direction}`;
    if (visited.has(state)) {
      return true;
    }

    visited.add(state);

    if (visited.size > map.length * map[0].length * 4) {
      return false;
    }
  }
}

const solvePart2 = (input) => {
  const map = input.map((line) => line.split(''));
  const loopPositions = [];

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '.') {
        map[i][j] = '#';

        if (simulate(map)) {
          loopPositions.push([i, j]);
        }

        map[i][j] = '.';
      }
    }
  }

  return loopPositions.length;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function resetCursor() {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}

async function animateMovement(map) {
  const clonedMap = map.map((row) => [...row]);
  const startPosition = findStartingPosition(clonedMap);

  if (!startPosition) {
    console.log('No starting position found!');
    return;
  }

  let { startX, startY, direction } = startPosition;
  let x = startX;
  let y = startY;

  while (true) {
    clonedMap[x][y] = '.';
    const {
      x: nextX,
      y: nextY,
      direction: nextDirection,
      isOutOfBounds,
    } = move(clonedMap, x, y, direction);

    if (isOutOfBounds) {
      break;
    }

    x = nextX;
    y = nextY;
    direction = nextDirection;

    clonedMap[x][y] = direction;

    resetCursor();
    for (const row of clonedMap) {
      let line = '';
      for (const cell of row) {
        if (directions.includes(cell)) {
          line += `\x1b[31m${cell}\x1b[0m`;
        } else {
          line += cell;
        }
      }
      console.log(line);
    }

    await sleep(300);
  }

  console.log('Animation complete!');
}
// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input
  const input = readFile('test.txt');

  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
  // console.log('Animation:', animateMovement(input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
