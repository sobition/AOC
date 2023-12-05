const { readFile, timeIt, sumArray } = require("../../util");

const parseGameInput = (input) => {
  const [gameInfo, roundsInfo] = input.split(":");
  const gameId = gameInfo.split(" ")[1];

  let results = {
    id: Number(gameId),
    red: 0,
    blue: 0,
    green: 0,
  };
  const rounds = roundsInfo.split(";");

  rounds.forEach((round) => {
    const cubes = round.split(",");
    cubes.forEach((fist) => {
      const [number, color] = fist.trim().split(" ");
      if (!results[color]) {
        results[color] = Number(number);
      }
      if (results[color] < number) {
        results[color] = Number(number);
      }
    });
  });
  return results;
};

const part1 = () => {
  const lines = readFile("./input.txt");
  const expected = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const games = lines.map((game) => parseGameInput(game));

  const filtered = games.filter(
    (game) =>
      game.red <= expected.red &&
      game.blue <= expected.blue &&
      game.green <= expected.green,
  );

  const sumOfIds = filtered.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.id;
  }, 0);
  console.log("part1: ", sumOfIds);
};
timeIt(part1);

const part2 = () => {
  const lines = readFile("./input.txt");

  const games = lines
    .map((game) => parseGameInput(game))
    .map(({ id, ...rest }) => ({ ...rest }));

  const powers = games.map((game) => {
    return Object.values(game).reduce((acc, curr) => acc * curr, 1);
  });

  console.log("part2: ", sumArray(powers));
};
timeIt(part2);
