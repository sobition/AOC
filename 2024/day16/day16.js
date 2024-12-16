const { readFile, timeIt } = require('../../utils/utils');

function findShortestPath(grid) {
  const directions = [
    { dx: 0, dy: 1, facing: 'right' }, // Move right
    { dx: 1, dy: 0, facing: 'down' }, // Move down
    { dx: 0, dy: -1, facing: 'left' }, // Move left
    { dx: -1, dy: 0, facing: 'up' }, // Move up
  ];

  function findStartAndEnd() {
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

  const { start, end } = findStartAndEnd();
  if (!start || !end) return { score: -1, turns: 0, straightSteps: 0 }; // No start or end

  // Heuristic: Manhattan distance to the goal
  const heuristic = (x, y) => Math.abs(x - end.x) + Math.abs(y - end.y);

  const priorityQueue = [
    {
      x: start.x,
      y: start.y,
      facing: 'right',
      score: 0,
      turns: 0,
      straightSteps: 0,
      estimatedCost: heuristic(start.x, start.y),
      path: [],
    },
  ];

  const visited = new Map(); // Track the best score for each state

  const hashState = (x, y, facing) => `${x},${y},${facing}`;

  while (priorityQueue.length > 0) {
    // Sort the queue by estimated cost (A* optimization)
    priorityQueue.sort((a, b) => a.estimatedCost - b.estimatedCost);
    const current = priorityQueue.shift();

    const { x, y, facing, score, turns, straightSteps, path } = current;

    // If we reach the end, return the result
    if (x === end.x && y === end.y) {
      return { score, turns, straightSteps, path };
    }

    // Skip if we've visited this state with a better score
    const stateHash = hashState(x, y, facing);
    if (visited.has(stateHash) && visited.get(stateHash) <= score) continue;

    visited.set(stateHash, score);

    for (let i = 0; i < directions.length; i++) {
      const { dx, dy, facing: newFacing } = directions[i];
      const newX = x + dx;
      const newY = y + dy;

      // Ignore out-of-bounds or invalid moves (walls)
      if (
        newX < 0 ||
        newY < 0 ||
        newX >= grid.length ||
        newY >= grid[newX].length ||
        grid[newX][newY] === '#'
      ) {
        continue;
      }

      // Calculate the new score, turns, and straight steps
      const turnCost = facing === newFacing ? 0 : 1000; // Turning costs 1000
      const stepCost = 1; // Moving forward costs 1
      const newScore = score + turnCost + stepCost;
      const newTurns = turns + (facing === newFacing ? 0 : 1);
      const newStraightSteps = straightSteps + (facing === newFacing ? 1 : 0);
      const newPath = [
        ...path,
        facing === newFacing
          ? `Step to (${newX}, ${newY})`
          : `Turn to ${newFacing}, then step to (${newX}, ${newY})`,
      ];

      // Add to the queue with updated cost
      priorityQueue.push({
        x: newX,
        y: newY,
        facing: newFacing,
        score: newScore,
        turns: newTurns,
        straightSteps: newStraightSteps,
        estimatedCost: newScore + heuristic(newX, newY),
        path: newPath,
      });
    }
  }

  return { score: -1, turns: 0, straightSteps: 0 }; // No valid path
}

const solvePart1 = (input) => {
  const grid = input.map((row) => row.split(''));
  const score = findShortestPath(grid);
  console.log(score);
  return 'Solution for Part 1';
};

const solvePart2 = (input) => {
  return 'Solution for Part 2';
};

// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input
  const input = readFile('input.txt');

  console.log('Part 1:', timeIt(solvePart1, input));
  // console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
