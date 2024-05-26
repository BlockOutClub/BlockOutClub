'use client';

import React from 'react';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

import { BocType } from '@components/svgs/bocType';

import { UserProfile } from './user-profile';

type Props = {};

// eslint-disable-next-line no-unused-vars
export const Header: React.FC<Props> = (_props) => {
  const { data, status } = useSession();

  return (
    <div className='md:px-4 w-full flex justify-center'>
      <header className='container mx-auto px-4 pt-2 md:px-0 md:pt-6 fixed z-50'>
        <nav className='bg-white/10 dark:bg-black/90 flex mx-auto items-center justify-between border-[1px] border-black/10 dark:border-white/10 bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-lg md:rounded-2xl rounded-lg px-4 md:px-5 shadow py-2 md:py-3'>
          <a href='/'>
            <div className='py-2 md:py-4'>
              <BocType />
            </div>
          </a>
          <div className='flex items-center gap text-sm md:text-base'>
            <Link
              className='flex items-center text-gray-500 dark:text-gray-400 font-medium px-1.5 md:px-4 rounded-full py-2 md:py-2 transition-all ease-in-out text-xs md:text-sm scale-100 hover:scale-105 active:scale-95'
              href='https://github.com/sponsors/ful1e5'
              target='_blank'>
              <span className='hidden md:inline-block'>Become Sponsor</span>
              <span className='inline-block md:hidden'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-auto mr-5 rounded-xl fill-black/[.2] dark:fill-white/[.2] p-[5px] border border-gray transition-all ease-in-out hover:fill-black dark:hover:fill-white hover:border-black dark:hover:border-white'
                  viewBox='0 0 24 24'>
                  <path d='M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z' />
                </svg>
              </span>
            </Link>
            <Link
              className='px-4 md:px-5 text-xs md:text-sm flex items-center font-medium rounded-full py-2 animated-click border border-inverted'
              href='https://donate.unrwa.org/gaza/~my-donation'
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
            <div className='ml-4'>
              <UserProfile data={data} status={status} />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
