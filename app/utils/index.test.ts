import { describe } from 'node:test';
import { generateGrids, getBombIndexList, floodFillGrids2D } from './index';

describe('getBombIndexList', () => {
  const grids = 150;
  const bombNum = 15;
  it('should return correct size of bombs with no duplicated index', () => {
    const bombs = getBombIndexList(grids, bombNum);
    let hasDuplicatedNumber = false;
    expect(bombs.length).toEqual(bombNum);
    for (let i = 0; i < bombs.length - 1; i++) {
      if (bombs[i] === bombs[i + 1]) {
        hasDuplicatedNumber = true;
      }
    }
    expect(hasDuplicatedNumber).toBe(false);
  });

  it('should avoid specific index ', () => {
    const avoid = 10;
    const bombs = getBombIndexList(grids, bombNum, avoid);
    expect(bombs.includes(avoid)).toEqual(false);
  });
});

describe('generateGrids', () => {
  const rows = 10;
  const columns = 10;
  const bombs = 30;
  it('should return correct 2d array from arguments and contains correct number of bombs', () => {
    const grids = generateGrids(rows, columns, bombs);
    expect(grids.length).toEqual(rows);
    expect(grids[0].length).toEqual(columns);
    expect([...grids].flat().filter(e => e === 9).length).toEqual(bombs);
  });
});

describe('floodFillGrids2D', () => {
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
  const gridsToOpen: string[] = [];
  floodFillGrids2D(2, 2, state, gridsToOpen);
  console.log(gridsToOpen);
});
