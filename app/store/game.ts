import { create } from 'zustand';

enum GridType {
  default,
  numbered,
  blank,
  flagged,
  question
}

enum GameStatus {
  default,
  win,
  lose
}

enum Mode {
  easy = 'easy',
  normal = 'normal',
  hard = 'hard'
}

export interface GameState {
  boardState: GridType[][];
  status: GameStatus;
  mode: Mode;
  modeData: {
    [mode in Mode]: {
      rowNumber: number;
      columnNumber: number;
      bombNumber: number;
    };
  };
  setMode: (mode: Mode) => void;
}

export const useGameState = create<GameState>()(set => ({
  boardState: [],
  status: GameStatus.default,
  mode: Mode.hard,
  modeData: {
    easy: {
      rowNumber: 9,
      columnNumber: 9,
      bombNumber: 10
    },
    normal: {
      rowNumber: 16,
      columnNumber: 16,
      bombNumber: 40
    },
    hard: {
      rowNumber: 30,
      columnNumber: 16,
      bombNumber: 99
    }
  },
  setMode: mode => set({ mode })
}));
