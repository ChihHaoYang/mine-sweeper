import React from 'react';

interface GridProps {
  value: number;
  row: number;
  column: number;
  rowNumber: number;
  columnNumber: number;
  bombNumber: number;
  gridState: GridState;
  onLeftClick: (e: React.MouseEvent) => void;
  onRightClick: (e: React.MouseEvent) => void;
  onDoubleClick: (e: React.MouseEvent) => void;
}

export enum GridState {
  default = 'default',
  flagged = 'flagged',
  question = 'question',
  opened = 'opened'
}

const Grid = ({
  value,
  gridState,
  onLeftClick,
  onRightClick,
  onDoubleClick
}: GridProps) => {
  const renderGrid = () => {
    switch (gridState) {
      case GridState.default:
        return '';
      case GridState.flagged:
        return '🚩';
      case GridState.question:
        return '❔';
      case GridState.opened:
        switch (value) {
          case 0:
            return '';
          case 9:
            return '💣';
          default:
            return value;
        }
    }
  };

  const getClassName = () => {
    switch (gridState) {
      case GridState.opened:
        return 'open';
      case GridState.flagged:
        return 'flag';
      case GridState.question:
        return 'question';
      case GridState.default:
        return '';
    }
  };

  return (
    <div
      className={`grid-cell select-none ${getClassName()}`}
      onDoubleClick={onDoubleClick}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    >
      {renderGrid()}
    </div>
  );
};

export default Grid;
