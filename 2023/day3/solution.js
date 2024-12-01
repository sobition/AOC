const { readFile, timeIt, readColumns } = require('../../util');

const checkNeighbours = (pos, lines, width, height, emptySymbol = '.') => {
  const { left, right, y } = pos;
  const TOP = y - 1;
  const BOTTOM = y + 1;

  // Check left and right neighbors
  if (
    (left - 1 >= 0 && lines[y][left - 1] !== emptySymbol) ||
    (right + 1 < width && lines[y][right + 1] !== emptySymbol)
  ) {
    return true;
  }

  // Check top and bottom neighbors
  for (let i = TOP; i <= BOTTOM; i += 2) {
    if (i < 0 || i >= height) {
      continue;
    }
    for (
      let j = Math.max(0, left - 1);
      j <= Math.min(width - 1, right + 1);
      j++
    ) {
      if (lines[i][j] !== emptySymbol) {
        return true;
      }
    }
  }

  return false;
};

const calculateSum = (lines, height, width) => {
  let sum = 0;

  for (let i = 0; i < height; i++) {
    let num = '';
    let pos = { left: null, right: null };

    for (let j = 0; j < width; j++) {
      const current = lines[i][j];
      if (!isNaN(+current)) {
        num += current;
        pos.left ??= j;
        pos.right = j;
      }
      if (num !== '' && (isNaN(+current) || j === width - 1)) {
        const hasSymbolNeighbour = checkNeighbours(
          { y: i, ...pos },
          lines,
          width,
          height
        );
        sum += hasSymbolNeighbour ? +num : 0;

        num = '';
        pos = { left: null, right: null };
      }
    }
  }

  return sum;
};

const part1 = () => {
  const lines = readFile('./input.txt');
  const columns = readColumns(lines);
  const height = columns[0].length;
  const width = lines[0].length;

  const sum = calculateSum(lines, height, width);

  console.log('part1: ', sum);
};

timeIt(part1);

const findNumbers = (lines) => {
  const height = lines.length;
  const width = lines[0].length;
  const numbers = [];

  for (let i = 0; i < height; i++) {
    let num = '';
    let x = [];

    for (let j = 0; j < width; j++) {
      const current = lines[i][j];
      if (Number.isInteger(+current)) {
        num += current;
        x.push(j);
      }
      if (num !== '' && (!Number.isInteger(+current) || j === width - 1)) {
        numbers.push({ num: +num, y: i, x: x.slice() });
        num = '';
        x = [];
      }
    }
  }

  return numbers;
};

const findGears = (lines, numbers) => {
  const height = lines.length;
  const width = lines[0].length;
  let sum = 0;
  lines.forEach((row, i) => {
    row.split('').forEach((current, j) => {
      if (current === '*') {
        const neighbourNumbers = new Set();

        // find all number neighbours
        for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            const ni = i + k;
            const nj = j + l;

            if (
              ni >= 0 &&
              ni < height &&
              nj >= 0 &&
              nj < width &&
              Number.isInteger(+lines[ni][nj])
            ) {
              const neighbourNum = numbers.find(
                (n) => n.y === ni && n.x.includes(nj)
              );
              neighbourNumbers.add(neighbourNum);
            }
          }
        }

        if (neighbourNumbers.size === 2) {
          const nums = [...neighbourNumbers];
          sum += nums[0].num * nums[1].num;
        }
      }
    });
  });

  console.log('part2: ', sum);
};

const part2 = () => {
  const lines = readFile('./input.txt');
  const numbers = findNumbers(lines);
  findGears(lines, numbers);
};

timeIt(part2);
