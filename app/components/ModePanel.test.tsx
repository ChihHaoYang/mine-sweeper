import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModePanel from './ModePanel';

describe('ModePanel', () => {
  it('should render ModePanel correctly', () => {
    render(<ModePanel />);
    const element = screen.getByTestId('mode-panel');
    expect(element).toBeInTheDocument();
  });
});
