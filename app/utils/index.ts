export function getBombIndexList(totalGrid: number, bombNumber: number) {
  function shuffleArray(arr: number[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  const shuffledArray = shuffleArray(
    Array.from({ length: totalGrid }, (v, i) => i)
  );
  return shuffledArray.slice(0, bombNumber).sort((a, b) => a - b);
}

export function generateGrids(
  rowNumber: number,
  columnNumber: number,
  bombNumber: number
) {
  const start = Date.now();
  const total = rowNumber * columnNumber;
  const grid1d = Array(total);
  const grid2d: number[][] = [];
  const bombIndexList = getBombIndexList(total, bombNumber);

  // Put values into the grid: 0: white, 1~8: grid nearby bombs, 9: bomb
  for (let i = 0; i < total; i++) {
    const row2d = Math.floor(i / rowNumber);
    const col2d = i % rowNumber;
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
