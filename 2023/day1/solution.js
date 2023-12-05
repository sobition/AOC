const { readFile, timeIt, sumArray } = require("../../util");
const part1 = () => {
  const lines = readFile("./input.txt");
  const tuples = lines.map((line) => {
    const numbers = line.split("").filter((char) => !isNaN(char)); // Check if the character is a number

    return Number(numbers[0] + numbers[numbers.length - 1]);
  });
  console.log("part1: ", sumArray(tuples));
};
timeIt(part1);

const part2 = () => {
  const lines = readFile("./input.txt");

  const numberMap = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  const tuples = lines.map((row) => {
    Object.keys(numberMap).forEach((key) => {
      if (row.includes(key))
        row = row.replaceAll(key, `${key}${numberMap[key]}${key}`);
    });
    const firstDigit = row.match(/\d/)[0];
    const lastDigit = row.match(/(\d)[a-z]*$/)[1];
    return parseInt(`${firstDigit}${lastDigit}`);
  });

  console.log("part2: ", sumArray(tuples));
};
timeIt(part2);
