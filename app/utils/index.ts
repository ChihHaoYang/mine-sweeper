import { GridState } from '../store/game';

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
  }) as number[][];
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
        ...(col2d === 0 ? [] : [-columnNumber - 1]),
        -columnNumber,
        ...(col2d === columnNumber - 1 ? [] : [-columnNumber + 1]),
        ...(col2d === 0 ? [] : [-1]),
        ...(col2d === columnNumber - 1 ? [] : [1]),
        ...(col2d === 0 ? [] : [columnNumber - 1]),
        columnNumber,
        ...(col2d === columnNumber - 1 ? [] : [columnNumber + 1])
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

export function generateGridsState(rowNumber: number, columnNumber: number) {
  return Array.from({ length: rowNumber }).map(e => {
    return Array.from({ length: columnNumber }).fill(GridState.default);
  }) as GridState[][];
}

export function getGridsToBeOpened(
  row: number,
  col: number,
  state: number[][],
  result: {
    [row: number]: {
      [column: number]: boolean;
    };
  }
) {
  // Flood Fill algorithm
  const isValid =
    row >= 0 && row < state.length && col >= 0 && col < state[row].length;
  if (isValid) {
    const value = state[row][col];
    if (!result[row] || !result[row][col]) {
      if (!result[row]) {
        result[row] = {};
      }
      result[row][col] = true;
      if (value !== 0) {
        return;
      }
      getGridsToBeOpened(row - 1, col - 1, state, result);
      getGridsToBeOpened(row - 1, col, state, result);
      getGridsToBeOpened(row - 1, col + 1, state, result);
      getGridsToBeOpened(row, col - 1, state, result);
      getGridsToBeOpened(row, col + 1, state, result);
      getGridsToBeOpened(row + 1, col - 1, state, result);
      getGridsToBeOpened(row + 1, col, state, result);
      getGridsToBeOpened(row + 1, col + 1, state, result);
    }
  } else {
    return;
  }
}

export function getUpdateGridStateParamter(
  row: number,
  col: number,
  state: number[][],
  gridsState: GridState[][]
) {
  const result: {
    [row: number]: {
      [col: number]: boolean;
    };
  } = {};
  getGridsToBeOpened(row, col, state, result);

  return (Object.keys(result) as Array<unknown>).reduce(
    (
      acc: {
        row: number;
        column: number;
        state: GridState;
      }[],
      r
    ) => {
      const row = r as number;
      (Object.keys(result[row]) as Array<unknown>).forEach(c => {
        const column = c as number;
        if (gridsState[row][c as number] === GridState.default) {
          acc.push({ row, column, state: GridState.opened });
        }
      });
      return acc;
    },
    []
  );
}
