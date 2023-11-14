const { readFile, readColumns, timeIt } = require("../../util");

function findMostFrequentItem(arr) {
  const frequencyMap = arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  let mostFrequentItem;
  let highestFrequency = 0;

  for (const item in frequencyMap) {
    if (frequencyMap[item] > highestFrequency) {
      mostFrequentItem = item;
      highestFrequency = frequencyMap[item];
    }
  }

  // Check if there are equal numbers of zero and one
  if (frequencyMap[0] === frequencyMap[1]) {
    return 1;
  }

  return mostFrequentItem;
}
function findLeastFrequentItem(arr) {
  const frequencyMap = arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  let leastFrequentItem;
  let lowestFrequency = Infinity; // Start with a high value to ensure any frequency is lower

  for (const item in frequencyMap) {
    if (frequencyMap[item] < lowestFrequency) {
      leastFrequentItem = item;
      lowestFrequency = frequencyMap[item];
    }
  }

  return leastFrequentItem;
}

const getGamma = (lines) => {
  const columns = readColumns(lines);
  let gamma = "";
  columns.forEach((bit) => {
    gamma += findMostFrequentItem(bit, "gamma");
  });
  return gamma;
};

const getEpsoilon = (lines) => {
  const columns = readColumns(lines);
  let epsilon = "";
  columns.forEach((bit) => {
    epsilon += findLeastFrequentItem(bit, "epsilon");
  });
  return epsilon;
};

const part1 = () => {
  const lines = readFile("./input.txt");

  const gamma = getGamma(lines);
  const epsilon = getEpsoilon(lines);
  console.log("part1: ", parseInt(gamma, 2) * parseInt(epsilon, 2));
};

const getOxygenGenerator = (lines, index = 0) => {
  const gamma = getGamma(lines);
  const filtered = lines.filter((line) => line[index] === gamma[index]);
  if (filtered.length === 1) {
    return filtered[0];
  }
  return getOxygenGenerator(filtered, index + 1);
};

const getCO2Generator = (lines, index = 0) => {
  const epsilon = getEpsoilon(lines);
  const filtered = lines.filter((line) => line[index] === epsilon[index]);
  if (filtered.length === 1) {
    return filtered[0];
  }
  return getCO2Generator(filtered, index + 1);
};

const part2 = () => {
  const lines = readFile("./input.txt");
  const oxygenRating = getOxygenGenerator(lines);
  const CO2Rating = getCO2Generator(lines);

  console.log("part2: ", parseInt(oxygenRating, 2) * parseInt(CO2Rating, 2));
};

timeIt(part1);
timeIt(part2);
