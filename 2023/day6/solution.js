const { readFile, timeIt } = require("../../util");
const part1 = () => {
  const [times, dists] = readFile("./input.txt").map((line) =>
    line.match(/\d+/g).map(Number),
  );

  let sum = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const dist = dists[i];

    let minTime = (time - Math.sqrt(time ** 2 - 4 * dist)) / 2;
    minTime = Number.isInteger(minTime) ? minTime + 1 : Math.ceil(minTime);
    const nWays = time - (minTime - 1) * 2 - 1;
    sum *= nWays;
  }
  console.log("part1: ", sum);
};
timeIt(part1);

const part2 = () => {
  const [times, dists] = readFile("./input.txt").map((line) => [
    +line.match(/\d+/g).join(""),
  ]);

  let sum = 1;
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const dist = dists[i];

    let minTime = (time - Math.sqrt(time ** 2 - 4 * dist)) / 2;
    minTime = Number.isInteger(minTime) ? minTime + 1 : Math.ceil(minTime);
    const nWays = time - (minTime - 1) * 2 - 1;
    sum *= nWays;
  }
  console.log("part2: ", sum);
};
timeIt(part2);
