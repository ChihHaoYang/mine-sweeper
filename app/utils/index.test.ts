import { generateGrids, getMineIndexList, getGridsToBeOpened } from './index';

describe('getMineIndexList', () => {
  const grids = 150;
  const mineNum = 15;
  it('should return correct size of mines with no duplicated index', () => {
    const mines = getMineIndexList(grids, mineNum);
    let hasDuplicatedNumber = false;
    expect(mines.length).toEqual(mineNum);
    for (let i = 0; i < mines.length - 1; i++) {
      if (mines[i] === mines[i + 1]) {
        hasDuplicatedNumber = true;
      }
    }
    expect(hasDuplicatedNumber).toBe(false);
  });

  it('should avoid specific index ', () => {
    const avoid = 10;
    const mines = getMineIndexList(grids, mineNum, avoid);
    expect(mines.includes(avoid)).toEqual(false);
  });
});

describe('generateGrids', () => {
  const rows = 10;
  const columns = 10;
  const mines = 30;
  it('should return correct 2d array from arguments and contains correct number of mines', () => {
    const grids = generateGrids(rows, columns, mines);
    expect(grids.length).toEqual(rows);
    expect(grids[0].length).toEqual(columns);
    expect([...grids].flat().filter(e => e === 9).length).toEqual(mines);
  });
});

describe('getGridsToBeOpened', () => {
  it('should not open r0c0 and r1c0 for clicking r2c2', () => {
    // **00
    // *310
    // 1100
    // 0000
    const state = [
      [9, 9, 0, 0],
      [9, 3, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0]
    ];
    const gridsToOpen: {
      [row: number]: {
        [col: number]: boolean;
      };
    } = {};
    getGridsToBeOpened(2, 2, state, gridsToOpen);
    expect(gridsToOpen[0][0]).not.toEqual(true);
    expect(gridsToOpen[1][0]).not.toEqual(true);
  });

  it('should open r2c0, r3c0, r2c1, r3c1 when clicking r3c0', () => {
    // *011
    // *21*
    // 1222
    // 01*1
    const state = [
      [9, 0, 1, 1],
      [9, 2, 1, 9],
      [1, 2, 2, 2],
      [0, 1, 9, 1]
    ];

    const gridsToOpen: {
      [row: number]: {
        [col: number]: boolean;
      };
    } = {};
    getGridsToBeOpened(3, 0, state, gridsToOpen);
    expect(gridsToOpen[2][0]).toEqual(true);
    expect(gridsToOpen[3][0]).toEqual(true);
    expect(gridsToOpen[2][1]).toEqual(true);
    expect(gridsToOpen[3][1]).toEqual(true);
  });
});
