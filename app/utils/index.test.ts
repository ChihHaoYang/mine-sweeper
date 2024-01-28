import { describe } from 'node:test';
import { generateGrids, getBombIndexList } from './index';

describe('getBombIndexList', () => {
  it('should return correct size of bombs with no duplicated index', () => {
    const bombs = getBombIndexList(150, 15);
    let hasDuplicatedNumber = false;
    expect(bombs.length).toEqual(15);
    for (let i = 0; i < bombs.length - 1; i++) {
      if (bombs[i] === bombs[i + 1]) {
        hasDuplicatedNumber = true;
      }
    }
    expect(hasDuplicatedNumber).toBe(false);
  });
});

describe('generateGrids', () => {
  it('should return correct 2d array from arguments and contains correct number of bombs', () => {
    const rows = 10;
    const columns = 10;
    const bombs = 30;
    const grids = generateGrids(rows, columns, bombs);
    expect(grids.length).toEqual(rows);
    expect(grids[0].length).toEqual(columns);
    expect([...grids].flat().filter(e => e === 9).length).toEqual(bombs);
  });
});
