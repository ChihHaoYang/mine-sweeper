import Grid, { GridState, TEXT_CLASS_MAP } from './Grid';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Grid', () => {
  const onLeftClick = jest.fn();
  const onRightClick = jest.fn();
  const onDoubleClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    [1, TEXT_CLASS_MAP[1]],
    [3, TEXT_CLASS_MAP[3]],
    [5, TEXT_CLASS_MAP[5]]
  ])(
    'value %s should render grid with text className %s and trigger events correctly',
    (value, className) => {
      render(
        <Grid
          value={value}
          gridState={GridState.default}
          onLeftClick={onLeftClick}
          onRightClick={onRightClick}
          onDoubleClick={onDoubleClick}
        />
      );

      const grid = screen.getByTestId('grid');

      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass(className);

      fireEvent.click(grid);
      expect(onLeftClick).toHaveBeenCalledTimes(1);
      fireEvent.contextMenu(grid);
      expect(onRightClick).toHaveBeenCalledTimes(1);
      fireEvent.doubleClick(grid);
      expect(onDoubleClick).toHaveBeenCalledTimes(1);
    }
  );
});
