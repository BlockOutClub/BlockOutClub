'use client';

import React from 'react';
import Link from 'next/link';

import { BocType } from './svgs/bocType';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const Header: React.FC<Props> = (_props) => {
  return (
    <div className='md:px-4 w-full flex justify-center'>
      <header className='container mx-auto px-4 pt-2 md:px-0 md:pt-6 max-w-5xl fixed z-50'>
        <nav className='bg-white/10 dark:bg-black/90 flex mx-auto items-center justify-between border-[1px] border-black/10 dark:border-white/10 bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-lg md:rounded-2xl rounded-lg px-4 md:px-5 shadow py-2 md:py-3'>
          <a href='/'>
            <div className='py-2 md:py-4'>
              <BocType />
            </div>
          </a>
          <div className='flex items-center text-sm md:text-base'>
            <Link
              className='mr-1 text-gray-500 dark:text-gray-400 font-medium px-1.5 md:px-4 rounded-full py-2 md:py-2 transition-all ease-in-out text-xs md:text-sm scale-100 hover:scale-105 active:scale-95'
              href='https://github.com/sponsors/ful1e5'
              target='_blank'>
              Become Sponsor
            </Link>
            <Link
              className='px-4 md:px-5 font-medium rounded-full py-2.5 transition-transform scale-100 hover:scale-105 active:scale-95 ease-in-out bg-black dark:bg-white text-white dark:text-black text-xs md:text-sm flex items-center'
              href='https://www.unfpa.org/donate/Gaza?form=FUNRVQMJQQQ'
              target='_blank'>
              Donate to Gaza
              <span className='hidden md:inline-block ml-2 items-center text-inherit'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  viewBox='0 0 16 16'
                  className='h-3.5 w-3.5'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'></path>
                </svg>
              </span>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};
