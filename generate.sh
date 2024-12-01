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

# Create files
cat <<EOL > "$YEAR/$DAY_DIR/day$DAY.js"
const { readFile, timeIt } = require("../../util");

// Solve Part 1
const solvePart1 = (input) => {
  // Write logic for Part 1 here
  return 'Solution for Part 1';
};

// Solve Part 2
const solvePart2 = (input) => {
  // Write logic for Part 2 here
  return 'Solution for Part 2';
};

// Main execution
const main = () => {
  // Change \`test.txt\` to \`input.txt\` for full input
  const input = readFile("input.txt");

  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

main();
EOL

touch "$YEAR/$DAY_DIR/test.txt"
touch "$YEAR/$DAY_DIR/input.txt"

echo "Created $YEAR/$DAY_DIR with files:"
echo " - day$DAY.js"
echo " - test.txt"
echo " - input.txt"

