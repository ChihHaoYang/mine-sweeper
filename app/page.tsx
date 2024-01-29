'use client';
import { useEffect } from 'react';
import { Navbar, GameBoard } from './components';

export default function Home() {
  useEffect(() => {
    function disableContextMenu(e: MouseEvent) {
      e.preventDefault();
    }

    document.addEventListener('contextmenu', disableContextMenu);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
    };
  }, []);

  return (
    <div className='relative h-full flex flex-col'>
      <Navbar />
      <GameBoard />
    </div>
  );
}
