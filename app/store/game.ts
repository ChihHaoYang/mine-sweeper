import { create } from 'zustand';

export enum GameStatus {
  mode,
  initial,
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
  startNewGame: () => void;
  revealAllGrids: () => void;
}

export const useGameState = create<GameState>()(set => ({
  grids: [],
  gridsState: [],
  status: GameStatus.initial,
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
      bombNumber: 80
    }
  },
  setGrids: (grids, gridsState) => set({ grids, gridsState: gridsState || [] }),
  updateGridsState: gridsToUpdate =>
    set(state => {
      const { rowNumber, columnNumber, bombNumber } =
        state.modeData[state.mode];
      const newState = [...state.gridsState];
      gridsToUpdate.forEach(e => {
        newState[e.row][e.column] = e.state;
      });

      const isGameOver =
        newState.flat().filter(e => e === GridState.opened).length ===
        rowNumber * columnNumber - bombNumber;

      return {
        gridsState: newState,
        status: isGameOver ? GameStatus.win : state.status
      };
    }),
  setMode: mode => set({ mode, status: GameStatus.mode }),
  gameStart: () => set({ status: GameStatus.start }),
  gameOver: () =>
    set(state => {
      const { grids } = state;
      const newState = [...state.gridsState].map((row, rowIndex) => {
        return row.map((col, colIndex) => {
          if (grids[rowIndex][colIndex] === 9) {
            return GridState.opened;
          }
          return col;
        });
      });
      return { status: GameStatus.lose, gridsState: newState };
    }),
  startNewGame: () =>
    set({ status: GameStatus.initial, grids: [], gridsState: [] }),
  revealAllGrids: () =>
    set(state => ({
      gridsState: [...state.gridsState].map(row => {
        return row.map(col => GridState.opened);
      })
    }))
}));
