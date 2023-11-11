const readFile = require("../util").readFile;

// const readFile = (filePath) => {
//   const allFileContents = fs.readFileSync(filePath, "utf-8");
//   return allFileContents
//     .split(/\r?\n/)
//     .filter((line) => line)
//     .map((line) => parseInt(line));
// };
const part1 = () => {
  const lines = readFile("./test.txt").map((line) => parseInt(line));
  let increments = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] < lines[i + 1]) {
      increments.push(lines[i + 1]);
    }
  }

  console.log("part1: ", increments.length);
};

const part2 = () => {
  const lines = readFile("./input.txt").map((line) => parseInt(line));
  const sumsList = [];

  for (let i = 0; i < lines.length; i++) {
    const chunks = lines.slice(i, i + 3);
    sumsList.push(chunks.reduce((a, b) => a + b, 0));
  }

  let increments = [];
  for (let i = 0; i < sumsList.length; i++) {
    if (sumsList[i] < sumsList[i + 1]) {
      increments.push(sumsList[i + 1]);
    }
  }
  console.log("sumsList", increments.length);
};
part1();
part2();
