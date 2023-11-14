const fs = require("fs");

const readFile = (filePath) => {
  const allFileContents = fs.readFileSync(filePath, "utf-8");
  return allFileContents.split(/\r?\n/).filter((line) => line);
};

const readColumns = (array) => {
  const columns = [];
  for (let i = 0; i < array[0].length; i++) {
    columns.push(array.map((row) => row[i]));
  }
  return columns;
};
const sumArray = (array) => {
  return array.reduce((acc, curr) => acc + curr, 0);
};

const timeIt = (func, ...args) => {
  const start = new Date();
  const result = func(...args);
  const end = new Date();
  console.log(`Execution time: ${end - start}ms`);
  return result;
};

module.exports = {
  readFile,
  readColumns,
  sumArray,
  timeIt,
};
