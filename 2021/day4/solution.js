const { readFile, timeIt } = require('../../util');
const part1 = () => {
  const lines = readFile('./test.txt').map((line) => parseInt(line));
  console.log('part1: ');
};
timeIt(part1);
