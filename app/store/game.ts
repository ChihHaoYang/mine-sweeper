import { create } from 'zustand';

export enum GameStatus {
  default,
  start,
  win,
  lose
}

enum Mode {
  easy = 'easy',
  normal = 'normal',
  hard = 'hard'
}

export interface GameState {
  grids: number[][];
  status: GameStatus;
  mode: Mode;
  modeData: {
    [mode in Mode]: {
      rowNumber: number;
      columnNumber: number;
      bombNumber: number;
    };
  };
  setGrids: (grid: number[][]) => void;
  setMode: (mode: Mode) => void;
  gameStart: () => void;
  gameOver: () => void;
}

export const useGameState = create<GameState>()(set => ({
  grids: [],
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
      rowNumber: 16,
      columnNumber: 30,
      bombNumber: 99
    }
  },
  setGrids: grids => set({ grids }),
  setMode: mode => set({ mode, status: GameStatus.default }),
  gameStart: () => set({ status: GameStatus.start }),
  gameOver: () => set({ status: GameStatus.lose })
}));
