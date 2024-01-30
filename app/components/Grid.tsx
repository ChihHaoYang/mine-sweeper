import React from 'react';

interface GridProps {
  value: number;
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

export const TEXT_CLASS_MAP: {
  [value: number]: string;
} = {
  1: 'text-sky-500',
  2: 'text-teal-900',
  3: 'text-red-600',
  4: 'text-blue-700',
  5: 'text-pink-950',
  6: 'text-sky-700',
  7: 'text-violet-700',
  8: 'text-rose-950'
};

const STATE_CLASS_MAP: {
  [key in GridState]: string;
} = {
  [GridState.default]: '',
  [GridState.opened]: 'open',
  [GridState.flagged]: 'flag',
  [GridState.question]: 'question'
};

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

  const textClass = TEXT_CLASS_MAP[value] || '';
  const stateClass = STATE_CLASS_MAP[gridState];

  return (
    <div
      data-testid='grid'
      className={`grid-cell flex items-center font-bold justify-center text-base border-2 border-solid border-stone-700 w-7 h-7 sm:w-10 sm:h-10 sm:text-lg select-none ${textClass} ${stateClass}`}
      onDoubleClick={onDoubleClick}
      onClick={onLeftClick}
      onContextMenu={onRightClick}
    >
      {renderGrid()}
    </div>
  );
};

export default Grid;
