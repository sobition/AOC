const { readFile, sumArray, timeIt } = require('../../utils/utils');

const part1 = () => {
  const lines = readFile('./test.txt').map((line) => parseInt(line));
  let increments = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] < lines[i + 1]) {
      increments.push(lines[i + 1]);
    }
  }

  console.log('part1: ', increments.length);
};

const part2 = () => {
  const lines = readFile('./input.txt').map((line) => parseInt(line));
  const sumsList = [];

  for (let i = 0; i < lines.length; i++) {
    const chunks = lines.slice(i, i + 3);
    sumsList.push(sumArray(chunks));
  }

  let increments = [];
  for (let i = 0; i < sumsList.length; i++) {
    if (sumsList[i] < sumsList[i + 1]) {
      increments.push(sumsList[i + 1]);
    }
  }
  console.log('part2: ', increments.length);
};
timeIt(part1);
timeIt(part2);
