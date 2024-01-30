import ModeCard from './ModeCard';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Mode } from '../store/game';

describe('ModeCard', () => {
  it.each([
    [Mode.easy, 'bg-lime-300'],
    [Mode.normal, 'bg-yellow-300'],
    [Mode.hard, 'bg-red-300'],
    [Mode.mobileHard, 'bg-red-300']
  ])(
    '%s mode card should render correctly with %s className',
    async (mode, className) => {
      render(<ModeCard mode={mode} />);
      const element = screen.getByTestId('mode-card');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(className);
    }
  );
});
