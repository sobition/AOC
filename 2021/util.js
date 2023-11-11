const fs = require("fs");

const readFile = (filePath) => {
  const allFileContents = fs.readFileSync(filePath, "utf-8");
  return allFileContents.split(/\r?\n/).filter((line) => line);
};

module.exports = {
  readFile,
};
