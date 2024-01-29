import React, { useState, useRef } from 'react';
import { useGameState, GameState, GameStatus } from '../store/game';
import { generateGrids, generateGridsState } from '../utils';

interface GridProps {
  value: number;
  row: number;
  column: number;
  rowNumber: number;
  columnNumber: number;
  bombNumber: number;
}

export enum GridState {
  default = 'default',
  flagged = 'flagged',
  question = 'question',
  opened = 'opened'
}

const Grid = ({
  value,
  row,
  column,
  rowNumber,
  columnNumber,
  bombNumber
}: GridProps) => {
  // const [gridState, setGridState] = useState<GridState>(GridState.default);
  const {
    gameStart,
    gameOver,
    status,
    setGrids,
    gridsState,
    updateGridsState
  } = useGameState<GameState>(state => state);
  console.log({ gridsState, rowNumber, columnNumber });
  const gridState = gridsState[row][column];

  function onClick() {
    if (status === GameStatus.default) {
      gameStart();
      setGrids(
        generateGrids(
          rowNumber,
          columnNumber,
          bombNumber,
          rowNumber * row + column
        ),
        generateGridsState(rowNumber, columnNumber)
      );
    }
    switch (gridState) {
      case GridState.default: {
        updateGridsState([{ row, column, state: GridState.opened }]);
        if (value === 9) {
          alert('Bomb');
          gameOver();
          return;
        }
      }
      case GridState.flagged:
      case GridState.question:
      case GridState.opened:
        return;
    }
  }

  function onContextMenu(e: React.MouseEvent) {
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
  }

  function onDoubleClick() {}

  const renderGrid = () => {
    switch (gridState) {
      case GridState.default:
        return '';
      case GridState.flagged:
        return '🚩';
      case GridState.question:
        return '❓';
      case GridState.opened:
        return value === 9 ? '💣' : value;
    }
  };

  return (
    <div
      className={`grid-cell select-none ${gridState === GridState.opened ? 'open' : ''}`}
      onDoubleClick={onDoubleClick}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {renderGrid()}
    </div>
  );
};

export default Grid;
