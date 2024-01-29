'use client';
import { Navbar, GameBoard } from './components';

export default function Home() {
  return (
    <div className='relative h-full flex flex-col'>
      <Navbar />
      <GameBoard />
    </div>
  );
}
