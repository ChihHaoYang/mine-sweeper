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

export enum GridState {
  default = 'default',
  flagged = 'flagged',
  question = 'question',
  opened = 'opened'
}

export interface GameState {
  grids: number[][];
  gridsState: GridState[][];
  status: GameStatus;
  mode: Mode;
  modeData: {
    [mode in Mode]: {
      rowNumber: number;
      columnNumber: number;
      bombNumber: number;
    };
  };
  setGrids: (grid: number[][], gridsState?: GridState[][]) => void;
  updateGridsState: (
    gridsToUpdate: {
      row: number;
      column: number;
      state: GridState;
    }[]
  ) => void;
  setMode: (mode: Mode) => void;
  gameStart: () => void;
  gameOver: () => void;
  revealAllGrids: () => void;
}

export const useGameState = create<GameState>()(set => ({
  grids: [],
  gridsState: [],
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
  setGrids: (grids, gridsState) => set({ grids, gridsState: gridsState || [] }),
  updateGridsState: gridsToUpdate =>
    set(state => {
      const newState = [...state.gridsState];
      gridsToUpdate.forEach(e => {
        newState[e.row][e.column] = e.state;
      });
      return {
        gridsState: newState
      };
    }),
  setMode: mode => set({ mode, status: GameStatus.default }),
  gameStart: () => set({ status: GameStatus.start }),
  gameOver: () => set({ status: GameStatus.lose }),
  revealAllGrids: () =>
    set(state => ({
      gridsState: [...state.gridsState].map(row => {
        return row.map(col => GridState.opened);
      })
    }))
}));
