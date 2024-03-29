import React from 'react';
import { useGameState, GameState, Mode } from '../store/game';
import ModeCard from './ModeCard';

const ModePanel = () => {
  const { setMode, initGame } = useGameState<GameState>(state => state);

  function onClick(mode: Mode) {
    return () => {
      setMode(mode);
      initGame();
    };
  }

  return (
    <div
      data-testid='mode-panel'
      className='p-3 overflow-hidden flex justify-center items-center flex-1'
    >
      <div className='grid grid-cols-3 w-full max-w-screen-xl gap-4 mt-12'>
        <ModeCard mode={Mode.easy} onClick={onClick(Mode.easy)} />
        <ModeCard mode={Mode.normal} onClick={onClick(Mode.normal)} />
        <div className='hidden w-full sm:block'>
          <ModeCard mode={Mode.hard} onClick={onClick(Mode.hard)} />
        </div>
        <div className='block w-full sm:hidden'>
          <ModeCard mode={Mode.mobileHard} onClick={onClick(Mode.mobileHard)} />
        </div>
      </div>
    </div>
  );
};

export default ModePanel;
