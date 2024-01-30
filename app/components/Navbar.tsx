import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { HiMenu } from 'react-icons/hi';
import { useGameState, GameState, GameStatus, GridState } from '../store/game';
import Counter from './Counter';

const Navbar = () => {
  const { startNewGame, status, homepage, gridsState, mode, modeData } =
    useGameState<GameState>(state => state);

  const { mineNumber } = modeData[mode];
  const flaggedGrid = gridsState.reduce((acc, current) => {
    return acc + current.filter(e => e === GridState.flagged).length;
  }, 0);

  const renderInfo = () => {
    if (status !== GameStatus.mode) {
      return (
        <div className='flex'>
          <div className='mr-2'>💣 {mineNumber - flaggedGrid}</div>
          <Counter />
        </div>
      );
    }
  };

  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900 sticky top-0'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <a href='#' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <span className='self-center flex text-base sm:text-2xl font-semibold whitespace-nowrap dark:text-white'>
            💣 Mine Sweeper
          </span>
        </a>
        {renderInfo()}
        {status !== GameStatus.mode && (
          <Menu as='div' className='relative inline-block text-left'>
            <Menu.Button className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'>
              <HiMenu fontSize='1.5rem' aria-hidden='true' />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
                <div className='px-1 py-1 '>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        onClick={startNewGame}
                      >
                        New game
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className='px-1 py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className='text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-sm'
                        onClick={homepage}
                      >
                        Back
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        )}
        <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
          <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            {status !== GameStatus.mode && (
              <>
                <li>
                  <a
                    href='#'
                    className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                    onClick={homepage}
                  >
                    Back
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                    onClick={startNewGame}
                  >
                    New game
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
