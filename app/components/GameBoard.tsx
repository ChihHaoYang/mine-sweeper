import React, { useEffect } from 'react';
import { useGameState, GameState, GameStatus } from '../store/game';
import { generateFakeGrids, generateGridsState } from '../utils';
import Grid from './Grid';

const boardClass: {
  [key: number]: string;
} = {
  9: 'grid-cols-9',
  16: 'grid-cols-16',
  30: 'grid-cols-30'
};

const GameBoard = () => {
  const { modeData, mode, grids, setGrids } = useGameState<GameState>(
    state => state
  );
  const { rowNumber, columnNumber } = modeData[mode];

  useEffect(() => {
    setGrids(
      generateFakeGrids(rowNumber, columnNumber),
      generateGridsState(rowNumber, columnNumber)
    );
  }, [rowNumber, columnNumber]);

  return (
    <div className='p-3 flex justify-center items-center flex-1'>
      <div className=''>
        {grids.map((row, rowIndex) => (
          <div key={rowIndex} className={`grid ${boardClass[columnNumber]}`}>
            {row.map((value, colIndex) => (
              <Grid
                key={colIndex}
                value={value}
                row={rowIndex}
                column={colIndex}
                {...modeData[mode]}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
