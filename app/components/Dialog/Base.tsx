'use client';
import React, { useState, useEffect } from 'react';
import { Dialog as HuiDialog } from '@headlessui/react';
import { useGameState, GameState, GameStatus } from '../../store/game';
import { WinDialog, LoseDialog } from './index';

enum DialogType {
  default = 'default',
  win = 'win',
  lose = 'lose'
}

export type DialogContentProps = {
  startNewGame: () => void;
  homepage: () => void;
};

const Dialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<DialogType>(DialogType.default);
  const { status, startNewGame, homepage } = useGameState<GameState>(
    state => state
  );

  useEffect(() => {
    switch (status) {
      case GameStatus.win:
        setType(DialogType.win);
        setTimeout(() => {
          setOpen(true);
        }, 200);
        break;
      case GameStatus.lose:
        setType(DialogType.lose);
        setTimeout(() => {
          setOpen(true);
        }, 200);
        break;
      default:
        setOpen(false);
        break;
    }
  }, [status]);

  const renderContent = () => {
    switch (type) {
      case DialogType.lose:
        return <LoseDialog startNewGame={startNewGame} homepage={homepage} />;
      case DialogType.win:
        return <WinDialog startNewGame={startNewGame} homepage={homepage} />;
      case DialogType.default:
        return null;
    }
  };

  return (
    <HuiDialog className='relative z-10' open={open} onClose={() => null}>
      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center'>
          {renderContent()}
        </div>
      </div>
    </HuiDialog>
  );
};

export default Dialog;
