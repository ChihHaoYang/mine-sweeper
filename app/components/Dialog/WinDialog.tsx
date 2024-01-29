import React from 'react';
import { Dialog } from '@headlessui/react';
import { DialogContentProps } from './Base';

const WinDialog = ({ startNewGame, homepage }: DialogContentProps) => {
  return (
    <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
      <Dialog.Title
        as='h3'
        className='text-lg font-medium leading-6 text-gray-900'
      >
        🎉Congratulations!
      </Dialog.Title>
      <Dialog.Description className='mt-2 text-sm text-gray-500'>
        You win the game! 😎😎😎
      </Dialog.Description>
      <div className='mt-4 text-right'>
        <button
          className='mr-2 inline-flex justify-center rounded-md border border-transparent bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
          onClick={homepage}
        >
          HOMEPAGE
        </button>
        <button
          className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
          onClick={startNewGame}
        >
          NEW GAME
        </button>
      </div>
    </Dialog.Panel>
  );
};
export default WinDialog;
