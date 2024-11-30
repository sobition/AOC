const fs = require("fs");
const path = require("path");
const { parseInput } = require("../../utils/utils");

// Load input (test or full)
const loadInput = (fileName) => {
  const filePath = path.join(__dirname, fileName);
  return fs.readFileSync(filePath, "utf-8");
};

// Solve Part 1
const solvePart1 = (input) => {
  // Write logic for Part 1 here
  return "Solution for Part 1";
};

// Solve Part 2
const solvePart2 = (input) => {
  // Write logic for Part 2 here
  return "Solution for Part 2";
};

// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input
  const rawInput = loadInput("test.txt");
  const input = parseInput(rawInput);

  console.log("Part 1:", solvePart1(input));
  // console.log('Part 2:', solvePart2(input));
};

main();
