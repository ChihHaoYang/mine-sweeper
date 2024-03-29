import React from 'react';
import { Mode } from '../store/game';

export interface ModeCardProps {
  mode: Mode;
  onClick?: () => void;
}

const ModeCard = ({ mode, onClick }: ModeCardProps) => {
  const title = {
    easy: 'Easy',
    normal: 'Normal',
    hard: 'Hard',
    mobileHard: 'Hard'
  }[mode];
  const size = {
    easy: '9x9',
    normal: '16x16',
    hard: '30x16',
    mobileHard: '16x24'
  }[mode];
  const bgColor = {
    easy: 'bg-lime-300',
    normal: 'bg-yellow-300',
    hard: 'bg-red-300',
    mobileHard: 'bg-red-300'
  }[mode];
  const bgColorHover = {
    easy: 'bg-lime-100',
    normal: 'bg-yellow-100',
    hard: 'bg-red-100',
    mobileHard: 'bg-red-100'
  }[mode];

  return (
    <div
      data-testid='mode-card'
      className={`w-full flex items-end cursor-pointer h-0 shadow-lg p-4 pt-full text-xl rounded-xl ${bgColor} hover:${bgColorHover}`}
      onClick={onClick}
    >
      <div className='inline-block box-border'>
        <div className='font-bold mt-2'>{title}</div>
        <div className='font-medium'>{size}</div>
      </div>
    </div>
  );
};

export default ModeCard;
