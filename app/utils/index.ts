export function getBombIndexList(
  totalGrid: number,
  bombNumber: number,
  avoidIndex?: number
) {
  function shuffleArray(arr: number[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  const shuffledArray = shuffleArray(
    Array.from({ length: totalGrid }, (v, i) => i).filter(e =>
      avoidIndex !== undefined ? e !== avoidIndex : true
    )
  );
  return shuffledArray.slice(0, bombNumber).sort((a, b) => a - b);
}

export function generateFakeGrids(rowNumber: number, columnNumber: number) {
  return Array.from({ length: rowNumber }).map(e => {
    return Array.from({ length: columnNumber }).fill(0);
  });
}

export function generateGrids(
  rowNumber: number,
  columnNumber: number,
  bombNumber: number,
  avoidIndex?: number
) {
  const start = Date.now();
  const total = rowNumber * columnNumber;
  const grid1d = Array(total);
  const grid2d: number[][] = [];
  const bombIndexList = getBombIndexList(total, bombNumber, avoidIndex);

  // Put values into the grid: 0: white, 1~8: grid nearby bombs, 9: bomb
  for (let i = 0; i < total; i++) {
    const row2d = Math.floor(i / columnNumber);
    const col2d = i % columnNumber;
    if (bombIndexList.includes(i)) {
      grid1d[i] = 9;
    } else {
      grid1d[i] = [
        -rowNumber - 1,
        -rowNumber,
        -rowNumber + 1,
        -1,
        1,
        rowNumber - 1,
        rowNumber,
        rowNumber + 1
      ].reduce((acc, current) => {
        if (bombIndexList.includes(i + current)) {
          acc++;
        }
        return acc;
      }, 0);
    }

    if (col2d === 0) {
      grid2d.push([grid1d[i]]);
    } else {
      grid2d[row2d].push(grid1d[i]);
    }
  }

  console.log(`Time used: ${Date.now() - start} ms`);

  return grid2d;
}

export function floodFillGrids2D(
  row: number,
  col: number,
  state: number[][],
  result: string[]
) {
  const isValid =
    row >= 0 && row < state.length && col >= 0 && col < state[row].length;
  console.log({ row, col, isValid });
  if (isValid && state[row][col] === 0 && !result.includes(`${row}-${col}`)) {
    result.push(`${row}-${col}`);
    floodFillGrids2D(row + 1, col, state, result);
    floodFillGrids2D(row - 1, col, state, result);
    floodFillGrids2D(row, col - 1, state, result);
    floodFillGrids2D(row, col + 1, state, result);
  } else {
    return;
  }
}
