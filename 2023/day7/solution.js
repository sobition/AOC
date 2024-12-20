const { readFile, timeIt } = require('../../utils/utils');

const part1 = () => {
  const lines = readFile('./input.txt');

  const cards = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
    'J',
    'Q',
    'K',
    'A',
  ];

  for (let i = 0; i < lines.length; i++) {
    let [hand, bid] = lines[i].split(' ');
    hand = hand.split('').map((card) => cards.indexOf(card).toString(16));
    bid = +bid;

    console.log('hand', hand);
    const map = {};
    for (const card of hand) {
      map[card] = (map[card] ?? 0) + 1;
    }
    const counts = Object.values(map).sort((a, b) => b - a);

    lines[i] = [[counts[0], counts[1] ?? 0, ...hand].join(), bid];
  }

  lines.sort(([a], [b]) => a.localeCompare(b));

  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    sum += lines[i][1] * (i + 1);
  }
  console.log('part1: ', sum);
};
// timeIt(part1);

const part2 = () => {
  const lines = readFile('./input.txt');
  const cards = [
    'J',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
    'Q',
    'K',
    'A',
  ];

  for (let i = 0; i < lines.length; i++) {
    let [hand, bid] = lines[i].split(' ');
    hand = hand.split('').map((card) => cards.indexOf(card).toString(16));
    bid = +bid;

    const nJokers = hand.filter((card) => card === '0').length;

    const map = {};
    for (const card of hand) {
      map[card] = (map[card] ?? 0) + 1;
    }
    map[0] = 0;
    const counts = Object.values(map).sort((a, b) => b - a);
    counts[0] += nJokers;

    lines[i] = [[counts[0], counts[1] ?? 0, ...hand].join(), bid];
  }

  lines.sort(([a], [b]) => a.localeCompare(b));

  let sum = 0;
  for (let i = 0; i < lines.length; i++) {
    sum += lines[i][1] * (i + 1);
  }
  console.log('part2: ', sum);
};

timeIt(part2);
