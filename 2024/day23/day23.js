const { readFile, timeIt } = require('../../utils/utils');

const buildGraph = (input) => {
  const graph = {};
  for (const connection of input) {
    const [a, b] = connection.split('-');
    if (!graph[a]) graph[a] = new Set();
    if (!graph[b]) graph[b] = new Set();
    graph[a].add(b);
    graph[b].add(a);
  }
  return graph;
};

const findTriplets = (graph) => {
  const triplets = new Set();

  for (const node of Object.keys(graph)) {
    for (const neighbor1 of graph[node]) {
      for (const neighbor2 of graph[neighbor1]) {
        if (
          graph[node].has(neighbor2) &&
          node < neighbor1 &&
          neighbor1 < neighbor2
        ) {
          triplets.add([node, neighbor1, neighbor2].sort().join(','));
        }
      }
    }
  }

  return triplets;
};

const filterTriplets = (triplets, predicate) =>
  Array.from(triplets).filter((triplet) => triplet.split(',').some(predicate));

const solvePart1 = (input) => {
  const graph = buildGraph(input);
  const triplets = findTriplets(graph);

  const filteredTriplets = filterTriplets(triplets, (node) =>
    node.startsWith('t')
  );

  return filteredTriplets.length;
};

const findLargestFullyConnectedSet = (graph) => {
  const nodes = Object.keys(graph);
  let largestClique = [];

  const bronKerbosch = (r, p, x) => {
    if (p.size === 0 && x.size === 0) {
      if (r.size > largestClique.length) {
        largestClique = Array.from(r);
      }
      return;
    }

    const pivot = [...p, ...x][0];
    const neighbors = graph[pivot] || new Set();

    for (const node of Array.from(p).filter((n) => !neighbors.has(n))) {
      const newR = new Set(r).add(node);
      const newP = new Set([...p].filter((n) => graph[node].has(n)));
      const newX = new Set([...x].filter((n) => graph[node].has(n)));

      bronKerbosch(newR, newP, newX);

      p.delete(node);
      x.add(node);
    }
  };

  bronKerbosch(new Set(), new Set(nodes), new Set());

  return largestClique.sort().join(',');
};

// Part 2: Solve using Bron-Kerbosch algorithm
const solvePart2 = (input) => {
  const graph = buildGraph(input);
  return findLargestFullyConnectedSet(graph);
};

// Main execution
const main = () => {
  const input = readFile('input.txt');
  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
