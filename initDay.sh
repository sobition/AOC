#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <parent_directory> <day_number>"
    exit 1
fi

parent_directory=$1
day_number=$2
directory_name="${parent_directory}/day${day_number}"

# Create parent directory if it doesn't exist
mkdir -p "$parent_directory"

# Create 'day${daynumber}' directory
mkdir "$directory_name"

# Create solution.js file
solution_code=$(cat <<EOF
const {readFile, timeIt} = require("../../utils/utils");
const part1 = () => {
  const lines = readFile("./test.txt").map((line) => parseInt(line));
  console.log("part1: ", lines);
};
timeIt(part1);
EOF
)

echo "$solution_code" > "$directory_name/solution.js"

# Create input.txt and test.txt files
touch "$directory_name/input.txt"
touch "$directory_name/test.txt"

echo "Directory '$directory_name' created with files: solution.js, input.txt, test.txt"
