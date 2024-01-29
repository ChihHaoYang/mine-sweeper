'use client';
import { Navbar, ModePanel, GameBoard, Dialog } from './components';
import { useGameState, GameState, GameStatus } from './store/game';

export default function Home() {
  const { status } = useGameState<GameState>(state => state);

  const renderContent = () => {
    switch (status) {
      case GameStatus.mode:
        return <ModePanel />;
      default:
        return <GameBoard />;
    }
  };

  return (
    <div className='relative h-full flex flex-col'>
      <Navbar />
      {renderContent()}
      <Dialog />
    </div>
  );
}
