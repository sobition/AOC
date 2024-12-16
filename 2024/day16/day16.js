const { readFile, timeIt } = require('../../utils/utils');

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function findStartAndEnd(grid) {
  let start = null,
    end = null;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 'S') start = { x: row, y: col };
      if (grid[row][col] === 'E') end = { x: row, y: col };
    }
  }
  return { start, end };
}

function findShortestPath(grid) {
  const directions = [
    { dx: 0, dy: 1, facing: 'right' },
    { dx: 1, dy: 0, facing: 'down' },
    { dx: 0, dy: -1, facing: 'left' },
    { dx: -1, dy: 0, facing: 'up' },
  ];

  const { start, end } = findStartAndEnd(grid);
  if (!start || !end) return -1; // No start or end

  const heuristic = (x, y) => Math.abs(x - end.x) + Math.abs(y - end.y);

  const priorityQueue = [
    {
      x: start.x,
      y: start.y,
      facing: 'right',
      score: 0,
      estimatedCost: heuristic(start.x, start.y),
    },
  ];

  const visited = new Map();
  const hashState = (x, y, facing) => `${x},${y},${facing}`;

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.estimatedCost - b.estimatedCost);
    const current = priorityQueue.shift();

    const { x, y, facing, score } = current;

    if (x === end.x && y === end.y) {
      return score;
    }

    const stateHash = hashState(x, y, facing);
    if (visited.has(stateHash) && visited.get(stateHash) <= score) continue;

    visited.set(stateHash, score);

    for (let i = 0; i < directions.length; i++) {
      const { dx, dy, facing: newFacing } = directions[i];
      const newX = x + dx;
      const newY = y + dy;

      if (
        newX < 0 ||
        newY < 0 ||
        newX >= grid.length ||
        newY >= grid[newX].length ||
        grid[newX][newY] === '#'
      ) {
        continue;
      }

      const turnCost = facing === newFacing ? 0 : 1000;
      const stepCost = 1;
      const newScore = score + turnCost + stepCost;

      priorityQueue.push({
        x: newX,
        y: newY,
        facing: newFacing,
        score: newScore,
        estimatedCost: newScore + heuristic(newX, newY),
      });
    }
  }

  return -1; // No valid path
}

const solvePart1 = (input) => {
  const grid = input.map((row) => row.split(''));
  const score = findShortestPath(grid);
  return score;
};

function getKey(c, dir) {
  return `${c.x},${c.y},${dir}`;
}

function getPaths(grid, lowestScore) {
  const { start, end } = findStartAndEnd(grid);
  const queue = [[start.x, start.y, 1, 0, [start]]];
  const visited = new Map();
  const paths = [];

  while (queue.length) {
    const [x, y, dir, score, path] = queue.shift();
    const key = getKey({ x, y }, dir);

    if (score > lowestScore) continue;
    if (visited.has(key) && visited.get(key) < score) continue;
    visited.set(key, score);

    if (x === end.x && y === end.y && score === lowestScore) {
      paths.push(path);
      continue;
    }

    const nx = x + dirs[dir][0];
    const ny = y + dirs[dir][1];
    if (grid[ny]?.[nx] !== '#') {
      queue.push([nx, ny, dir, score + 1, [...path, { x: nx, y: ny }]]);
    }

    queue.push([x, y, (dir + 1) % 4, score + 1000, [...path]]);
    queue.push([x, y, (dir + 3) % 4, score + 1000, [...path]]);
  }

  return paths;
}

const solvePart2 = (input) => {
  const grid = input.map((row) => row.split(''));
  const score = findShortestPath(grid);
  const paths = getPaths(grid, score);
  const uniquePaths = new Set();
  paths.forEach((path) => {
    path.forEach((p) => uniquePaths.add(getKey(p, 0)));
  });
  return uniquePaths.size;
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
