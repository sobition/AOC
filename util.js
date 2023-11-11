const fs = require("fs");

const readFile = (filePath) => {
  const allFileContents = fs.readFileSync(filePath, "utf-8");
  return allFileContents.split(/\r?\n/).filter((line) => line);
};

const sumArray = (array) => {
  return array.reduce((acc, curr) => acc + curr, 0);
};

module.exports = {
  readFile,
  sumArray,
};
