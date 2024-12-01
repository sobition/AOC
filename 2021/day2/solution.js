const readFile = require('../../utils/utils').readFile;
const timeIt = require('../../utils/utils').timeIt;

const part1 = () => {
  const lines = readFile('./input.txt');
  let position = { x: 0, y: 0, aim: 0 };

  lines.forEach((line) => {
    const [direction, step] = line.split(' ');
    if (direction === 'forward') {
      position.x += parseInt(step);
    } else if (direction === 'down') {
      position.y += parseInt(step);
    } else if (direction === 'up') {
      position.y -= parseInt(step);
    }
  });
  console.log('part1: ', position.x * position.y);
};

timeIt(part1);

const part2 = () => {
  const lines = readFile('./input.txt');
  let position = { x: 0, y: 0, aim: 0 };

  lines.forEach((line) => {
    const [direction, step] = line.split(' ');
    if (direction === 'forward') {
      position.x += parseInt(step);
      position.y += position.aim * parseInt(step);
    } else if (direction === 'down') {
      position.aim += parseInt(step);
    } else if (direction === 'up') {
      position.aim -= parseInt(step);
    }
  });
  console.log('part2: ', position.x * position.y);
};
timeIt(part1);
timeIt(part2);
