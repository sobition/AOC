const { readFile, timeIt } = require('../../utils/utils');

const createDiskArray = (diskMap) => {
  const freeSpaces = [];
  const files = [];

  diskMap.forEach((size, index) => {
    if (index % 2 === 0) {
      files.push(size);
    } else {
      freeSpaces.push(size);
    }
  });

  const result = [];
  let bIndex = 0;

  files.forEach((fileSize, i) => {
    result.push(...Array(fileSize).fill(i));

    if (bIndex < freeSpaces.length) {
      result.push(...Array(freeSpaces[bIndex]).fill('.'));
      bIndex++;
    }
  });

  return result;
};

function moveDotsToEnd(flatDisk) {
  let i = 0;
  let j = flatDisk.length - 1;

  while (i < j) {
    if (flatDisk[i] === '.' && flatDisk[j] !== '.') {
      flatDisk[i] = flatDisk[j];
      flatDisk[j] = '.';
      i++; // Move forward after swapping
      j--; // Move backward after swapping
    } else if (flatDisk[i] !== '.') {
      i++; // Move forward if no dot at i
    } else if (flatDisk[j] === '.') {
      j--; // Move backward if there's a dot at j
    }
  }

  return flatDisk;
}

const solvePart1 = (input) => {
  const diskMap = input[0].split('').map((x) => parseInt(x));
  const flatDisk = createDiskArray(diskMap);
  moveDotsToEnd(flatDisk);
  let sum = 0;
  for (let i = 0; i < flatDisk.length; i++) {
    if (flatDisk[i] === '.') continue;
    console.log(flatDisk[i], i);
    sum += flatDisk[i] * i;
  }
  return sum;
};

function findBlocks(diskArray) {
  let blocks = [];
  let currentBlock = [];

  for (let i = diskArray.length - 1; i >= 0; i--) {
    if (diskArray[i] !== '.') {
      if (
        currentBlock.length === 0 ||
        diskArray[i] === diskArray[currentBlock[0]]
      ) {
        currentBlock.unshift(i);
      } else {
        blocks.push(currentBlock);
        currentBlock = [i];
      }
    } else if (currentBlock.length > 0) {
      blocks.push(currentBlock);
      currentBlock = [];
    }
  }

  if (currentBlock.length > 0) {
    blocks.push(currentBlock);
  }
  return blocks;
}

function findFreeSpaces(diskArray) {
  let freeSpaces = [];
  let currentSpace = [];

  for (let i = 0; i < diskArray.length; i++) {
    if (diskArray[i] === '.') {
      currentSpace.push(i);
    } else if (currentSpace.length > 0) {
      freeSpaces.push(currentSpace);
      currentSpace = [];
    }
  }

  if (currentSpace.length > 0) {
    freeSpaces.push(currentSpace);
  }
  return freeSpaces;
}

function compactFiles(diskArray) {
  let blocks = findBlocks(diskArray);
  let freeSpaces = findFreeSpaces(diskArray);

  for (let block of blocks) {
    let blockLength = block.length;
    let moved = false; // Track whether the block was successfully moved

    for (let i = 0; i < freeSpaces.length; i++) {
      let space = freeSpaces[i];

      if (space[space.length - 1] < block[0] && space.length >= blockLength) {
        // Move the block to the free space
        for (let j = 0; j < blockLength; j++) {
          // console.log(
          //   'Moving',
          //   diskArray[block[j]],
          //   'from',
          //   block[j],
          //   'to',
          //   space[j]
          // );
          //
          diskArray[space[j]] = diskArray[block[j]];
          diskArray[block[j]] = '.';
          // console.log('Updated Disk:', diskArray);
        }

        // Update the free space list
        freeSpaces[i] = space.slice(blockLength);

        if (freeSpaces[i].length === 0) {
          freeSpaces.splice(i, 1);
        }

        moved = true; // Mark as successfully moved
        break;
      }
    }

    if (!moved) {
      // console.log('Block', block, 'could not move. Stopping.');
      continue;
    }
  }

  return diskArray;
}

const solvePart2 = (input) => {
  const diskMap = input[0].split('').map((x) => parseInt(x));
  const flatDisk = createDiskArray(diskMap);

  const orderedFiles = compactFiles(flatDisk);

  let sum = 0;
  for (let i = 0; i < orderedFiles.length; i++) {
    if (orderedFiles[i] === '.') continue;

    sum += orderedFiles[i] * i;
  }
  return sum;
};

// Main execution
const main = () => {
  // Change `test.txt` to `input.txt` for full input
  const input = readFile('input.txt');

  console.log('Part 1:', timeIt(solvePart1, input));
  console.log('Part 2:', timeIt(solvePart2, input));
};

if (require.main === module) {
  main();
}

module.exports = { solvePart1, solvePart2 };
