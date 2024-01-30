import { create } from 'zustand';

export enum GameStatus {
  mode,
  initial,
  start,
  win,
  lose
}

export enum Mode {
  easy = 'easy',
  normal = 'normal',
  hard = 'hard',
  mobileHard = 'mobileHard'
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
      mineNumber: number;
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
  homepage: () => void;
  initGame: () => void;
  gameStart: () => void;
  gameWin: () => void;
  gameOver: () => void;
  startNewGame: () => void;
  revealAllGrids: () => void;
}

export const useGameState = create<GameState>()(set => ({
  grids: [],
  gridsState: [],
  status: GameStatus.mode,
  mode: Mode.normal,
  modeData: {
    easy: {
      rowNumber: 9,
      columnNumber: 9,
      mineNumber: 10
    },
    normal: {
      rowNumber: 16,
      columnNumber: 16,
      mineNumber: 40
    },
    hard: {
      rowNumber: 16,
      columnNumber: 30,
      mineNumber: 80
    },
    mobileHard: {
      rowNumber: 24,
      columnNumber: 16,
      mineNumber: 60
    }
  },
  setGrids: (grids, gridsState) => set({ grids, gridsState: gridsState || [] }),
  updateGridsState: gridsToUpdate =>
    set(state => {
      const { rowNumber, columnNumber, mineNumber } =
        state.modeData[state.mode];
      const newState = [...state.gridsState];
      gridsToUpdate.forEach(e => {
        newState[e.row][e.column] = e.state;
      });

      const isGameOver =
        newState.flat().filter(e => e === GridState.opened).length ===
        rowNumber * columnNumber - mineNumber;

      return {
        gridsState: newState,
        status: isGameOver ? GameStatus.win : state.status
      };
    }),
  setMode: mode => set({ mode, status: GameStatus.mode }),
  initGame: () => set({ status: GameStatus.initial }),
  homepage: () => set({ status: GameStatus.mode }),
  gameStart: () => set({ status: GameStatus.start }),
  gameWin: () => set({ status: GameStatus.win }),
  gameOver: () =>
    set(state => {
      const { grids } = state;
      const newState = [...state.gridsState].map((row, rowIndex) => {
        return row.map((col, colIndex) => {
          // Reveal all mines not flagged
          if (grids[rowIndex][colIndex] === 9 && col !== GridState.flagged) {
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
