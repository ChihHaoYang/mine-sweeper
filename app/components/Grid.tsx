import React, { useState, useRef } from 'react';
import { useGameState, GameState, GameStatus } from '../store/game';
import { generateGrids, generateFakeGrids } from '../utils';

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
  const [gridState, setGridState] = useState<GridState>(GridState.default);
  const { gameStart, gameOver, status, setGrids } = useGameState<GameState>(
    state => state
  );

  function onClick() {
    if (status === GameStatus.default) {
      gameStart();
      setGrids(
        generateGrids(
          rowNumber,
          columnNumber,
          bombNumber,
          rowNumber * row + column
        )
      );
    }
    switch (gridState) {
      case GridState.default: {
        if (value === 9) {
          alert('Bomb');
          setGridState(GridState.opened);
          gameOver();
          return;
        }
        setGridState(GridState.opened);
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
        setGridState(GridState.flagged);
        return;
      case GridState.flagged:
        setGridState(GridState.question);
        return;
      case GridState.question:
        setGridState(GridState.default);
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
      className={`grid-cell select-none`}
      onDoubleClick={onDoubleClick}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {renderGrid()}
    </div>
  );
};

export default Grid;
