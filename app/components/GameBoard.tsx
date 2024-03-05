import React, { useEffect } from 'react';
import { useGameState, GameState, GameStatus } from '../store/game';
import {
  generateFakeGrids,
  generateGrids,
  generateGridsState,
  getGridsToBeOpened,
  getUpdateGridStateParamter
} from '../utils';
import Grid, { GridState } from './Grid';

const boardClass: {
  [key: number]: string;
} = {
  9: 'grid-cols-9',
  16: 'grid-cols-16',
  24: 'grid-cols-24',
  30: 'grid-cols-30'
};

const GameBoard = () => {
  const {
    modeData,
    mode,
    gameOver,
    grids,
    setGrids,
    gridsState,
    updateGridsState,
    gameStart,
    status
  } = useGameState<GameState>(state => state);
  const { rowNumber, columnNumber, mineNumber } = modeData[mode];

  useEffect(() => {
    if (status === GameStatus.initial) {
      setGrids(
        generateFakeGrids(rowNumber, columnNumber),
        generateGridsState(rowNumber, columnNumber)
      );
    }
  }, [rowNumber, columnNumber, status]);

  function onLeftClick(row: number, column: number) {
    return (e: React.MouseEvent) => {
      // Early return if it's not default state no matter it started or not
      const start = Date.now();
      const gridState = gridsState[row][column];
      if (gridState !== GridState.default) {
        return;
      }

      if (status === GameStatus.initial) {
        gameStart();
        const grids = generateGrids(
          rowNumber,
          columnNumber,
          mineNumber,
          columnNumber * row + column
        );
        const initialGridsState = [...gridsState.map(e => [...e])];
        const toOpen = getUpdateGridStateParamter(
          row,
          column,
          grids,
          initialGridsState
        );
        toOpen.forEach(s => {
          initialGridsState[s.row][s.column] = s.state;
        });
        setGrids(grids, initialGridsState);
        return;
      }

      const result = {};
      getGridsToBeOpened(row, column, grids, result);
      switch (grids[row][column]) {
        case 9:
          updateGridsState([{ row, column, state: GridState.opened }]);
          gameOver();
          break;
        case 0:
          const gridToBeOpened = getUpdateGridStateParamter(
            row,
            column,
            grids,
            gridsState
          );
          updateGridsState(gridToBeOpened);
          break;
        default:
          updateGridsState([{ row, column, state: GridState.opened }]);
          break;
      }

      console.log(`onLeftClick takes: ${Date.now() - start} ms`);
    };
  }

  function onRightClick(row: number, column: number) {
    return (e: React.MouseEvent) => {
      const start = Date.now();
      const gridState = gridsState[row][column];
      e.preventDefault();
      switch (gridState) {
        case GridState.default:
          updateGridsState([{ row, column, state: GridState.flagged }]);
          return;
        case GridState.flagged:
          updateGridsState([{ row, column, state: GridState.question }]);
          return;
        case GridState.question:
          updateGridsState([{ row, column, state: GridState.default }]);
          return;
        case GridState.opened:
          return;
      }

      console.log(`onRightClick takes: ${Date.now() - start} ms`);
    };
  }

  function onDoubleClick(row: number, column: number) {
    const value = grids[row][column];
    return (e: React.MouseEvent) => {
      const start = Date.now();
      const grids = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
      ]
        .map(coord => {
          return [row + coord[0], column + coord[1]];
        })
        .filter(
          g => g[0] >= 0 && g[0] < rowNumber && g[1] >= 0 && g[1] < columnNumber
        );
      const flags = grids.filter(
        g => gridsState[g[0]][g[1]] === GridState.flagged
      ).length;
      const toOpen = grids.filter(
        g => gridsState[g[0]][g[1]] === GridState.default
      );

      if (flags !== value) {
        return;
      }
      toOpen.forEach(g => onLeftClick(g[0], g[1])({} as React.MouseEvent));

      console.log(`onDoubleClick takes: ${Date.now() - start} ms`);
    };
  }

  return (
    <>
      <div className='p-3 flex justify-center items-center flex-1'>
        <div>
          {grids.map((row, rowIndex) => (
            <div key={rowIndex} className={`grid ${boardClass[columnNumber]}`}>
              {row.map((value, colIndex) => (
                <Grid
                  key={colIndex}
                  value={value}
                  gridState={gridsState[rowIndex][colIndex]}
                  onLeftClick={onLeftClick(rowIndex, colIndex)}
                  onRightClick={onRightClick(rowIndex, colIndex)}
                  onDoubleClick={onDoubleClick(rowIndex, colIndex)}
                  {...modeData[mode]}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GameBoard;
