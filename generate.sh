#!/bin/bash

# Usage: ./generate.sh <year> <day>
YEAR=$1
DAY=$2

# Validate input
if [ -z "$YEAR" ] || [ -z "$DAY" ]; then
  echo "Usage: ./generate.sh <year> <day>"
  exit 1
fi

# Format day with leading zero (e.g., 01, 02, ...)
DAY_DIR=$(printf "day%02d" "$DAY")

# Create directory structure
mkdir -p "$YEAR/$DAY_DIR"

# Create day.js file
cat <<EOL > "$YEAR/$DAY_DIR/day$DAY.js"
const { readFile, timeIt } = require("../../utils/utils");

const solvePart1 = (input) => {
  console.log(input);
  return 'Solution for Part 1';
};

const solvePart2 = (input) => {
  return 'Solution for Part 2';
};

// Main execution
const main = () => {
  // Change \`test.txt\` to \`input.txt\` for full input
  const input = readFile("test.txt");

  console.log('Part 1:', timeIt(solvePart1, input));
  // console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
EOL

# Create test file
cat <<EOL > "$YEAR/$DAY_DIR/day$DAY.test.js"
const path = require("path");
const { solvePart1, solvePart2 } = require("./day$DAY");
const { readFile } = require("../../utils/utils");

const input = readFile(path.resolve(__dirname, 'test.txt'));

describe("Day $DAY Solutions", () => {

  test("solvePart1 should return the expected output for Part 1", () => {
    const result = solvePart1(input);
    expect(result).toBe('Expected Part 1 Result'); 
  });

  test("solvePart2 should return the expected output for Part 2", () => {
    const result = solvePart2(input);
    expect(result).toBe('Expected Part 2 Result'); 
  });
});
EOL

# Create empty test.txt and input.txt files
touch "$YEAR/$DAY_DIR/test.txt"
touch "$YEAR/$DAY_DIR/input.txt"

# Output created structure
echo "Created $YEAR/$DAY_DIR with files:"
echo " - day$DAY.js"
echo " - day$DAY.test.js"
echo " - test.txt"
echo " - input.txt"
