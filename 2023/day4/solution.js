const { readFile, timeIt, sumArray } = require("../../util");

const parseInput = (line) => {
  const [cardInfo, numbers] = line.split(":");
  const cardNumber = cardInfo.split(" ")[1];
  const [winning, owned] = numbers.split("|");
  return {
    cardNumber,
    winning: winning
      .trim()
      .split(" ")
      .filter((item) => item !== ""),
    owned: owned.split(" ").filter((item) => item !== ""),
  };
};

const findCommonItems = (array1, array2) => {
  return array1.filter((item) => array2.includes(item));
};

const part1 = () => {
  const lines = readFile("./input.txt");
  const cardsInfo = lines.map((card) => parseInput(card));
  let points = 0;
  cardsInfo.forEach((card) => {
    const commonItems = findCommonItems(card.winning, card.owned);
    if (commonItems.length > 0) {
      points += Math.pow(
        2,
        findCommonItems(card.winning, card.owned).length - 1,
      );
    }
  });

  console.log("part: ", points);
};
timeIt(part1);

const part2 = () => {
  const lines = readFile("./input.txt");
  const cardsInfo = lines.map((card) => parseInput(card));
  const nCards = lines.map(() => 1);

  cardsInfo.forEach((card, i) => {
    const winCount = findCommonItems(card.winning, card.owned).length;
    for (let j = 0; j < winCount; j++) {
      nCards[i + 1 + j] += nCards[i];
    }
  });

  console.log("part2: ", sumArray(nCards));
};
timeIt(part2);
