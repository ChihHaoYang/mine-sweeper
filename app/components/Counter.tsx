import { useState, useEffect } from 'react';
import { useGameState, GameState, GameStatus } from '../store/game';

const Counter = () => {
  const { status } = useGameState<GameState>(state => state);
  const [start, setStart] = useState<Date>(new Date());
  const [date, setDate] = useState<Date>(new Date());
  const [final, setFinal] = useState<number>(0);
  // useEffect 處理 timer

  useEffect(() => {
    // Tick
    const timerID = setInterval(() => tick(), 1000);

    function tick() {
      setDate(new Date());
    }

    return () => clearInterval(timerID);
  }, []);

  useEffect(() => {
    if (status === GameStatus.start) {
      setStart(new Date());
    } else if ([GameStatus.win, GameStatus.lose].includes(status)) {
      setFinal(date.getTime() - start.getTime());
    }
  }, [status]);

  const renderTime = () => {
    const getH = (diff: number) =>
      Math.max(Math.floor(diff / (1000 * 60 * 60)), 0);
    const getM = (diff: number) =>
      Math.max(Math.floor((diff / (1000 * 60)) % 60), 0);
    const getS = (diff: number) => Math.max(Math.floor((diff / 1000) % 60), 0);
    const leading0 = (n: number) => `${n < 10 ? '0' : ''}${n}`;
    switch (status) {
      case GameStatus.initial:
        return `00:00:00`;
      case GameStatus.win:
      case GameStatus.lose:
        const h = getH(final);
        const m = getM(final);
        const s = getS(final);
        return `${leading0(h)}:${leading0(m)}:${leading0(s)}`;
      default: {
        const diff = date.getTime() - start.getTime(); // ms;
        const h = getH(diff);
        const m = getM(diff);
        const s = getS(diff);
        return `${leading0(h)}:${leading0(m)}:${leading0(s)}`;
      }
    }
  };

  return (
    <>
      <div>⏱ {renderTime()}</div>
    </>
  );
};

export default Counter;
