'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Boc } from '@components/svgs/boc';
import { GithubLogo } from '@components/svgs/github';
import { XLogo } from '@components/svgs/x';
import ThemeSwitch from '@components/themeSwitch';

import { LIB_VERSION } from '@root/version';

type Props = {};

const getGitBranch = (url: string | undefined) => {
  if (!url) return null;
  const regex = /-git-(.*?)-/;
  const match = regex.exec(url);
  return match && match[1];
};

// eslint-disable-next-line no-unused-vars
export const Footer: React.FC<Props> = (_props) => {
  const currentYear = new Date().getFullYear();
  const path = usePathname();

  const gitCommintSHA = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
  const url = process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL;
  const branch = getGitBranch(url);

  const refreshUrl =
    branch === 'main'
      ? 'https://dev.blockoutclub.com'
      : 'https://blockoutclub.com';
  const refreshBranch = branch === 'main' ? 'dev' : 'main';

  return (
    <footer className='border-t border-gray p-3 mt-20'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center pb-2'>
          <Link className='hover:text-[--accent-active]' href='/'>
            <Boc />
          </Link>

          <ul className='inline-flex gap-4 text-black/[.5] dark:text-white/[.5]'>
            <li>
              <Link
                href='https://github.com/BlockOutClub/BlockOutClub'
                target='_blank'
                className='hover:underline'
                rel='noopener noreferrer'>
                <GithubLogo />
              </Link>
            </li>

            <li>
              <Link
                href='https://x.com/BlockOutClub'
                target='_blank'
                className='hover:underline'
                rel='noopener noreferrer'>
                <XLogo />
              </Link>
            </li>
          </ul>
        </div>

        <div className='pb-4 lg:pb-12'>
          <div className='flex items-center justify-start gap-1 font-mono tracking-tighter text-sm'>
            <p>
              <Link
                target='_blank'
                href='https://github.com/BlockOutClub/BlockOutClub/blob/main/LICENSE'
                className='inline-flex hover:underline'>
                MIT License
              </Link>
            </p>

            <p>•</p>

            <p>
              <Link
                target='_blank'
                href='https://github.com/BlockOutClub/BlockOutClub/releases'
                className='inline-flex hover:underline'>
                {`v${LIB_VERSION}`}
              </Link>
            </p>
          </div>

          <div className='mt-3 flex items-center justify-start gap-2 font-mono tracking-tighter text-sm'>
            <div className='inline-flex gap-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='fill-current w-3'
                viewBox='0 0 24 24'>
                <path d='M21 3c0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.323.861 2.433 2.05 2.832.168 4.295-2.021 4.764-4.998 5.391-1.709.36-3.642.775-5.052 2.085v-7.492c1.163-.413 2-1.511 2-2.816 0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.305.837 2.403 2 2.816v12.367c-1.163.414-2 1.512-2 2.817 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.295-.824-2.388-1.973-2.808.27-3.922 2.57-4.408 5.437-5.012 3.038-.64 6.774-1.442 6.579-7.377 1.141-.425 1.957-1.514 1.957-2.803zm-16.8 0c0-.993.807-1.8 1.8-1.8s1.8.807 1.8 1.8-.807 1.8-1.8 1.8-1.8-.807-1.8-1.8zm3.6 18c0 .993-.807 1.8-1.8 1.8s-1.8-.807-1.8-1.8.807-1.8 1.8-1.8 1.8.807 1.8 1.8z' />
              </svg>

              <p>{branch}</p>

              {gitCommintSHA && (
                <>
                  <p>•</p>
                  <Link
                    target='_blank'
                    href={`https://github.com/BlockOutClub/BlockOutClub/commit/${gitCommintSHA}`}
                    className='hover:underline'>
                    {`${gitCommintSHA.substring(0, 6)}`}
                  </Link>
                </>
              )}

              <p>
                (
                <Link href={`${refreshUrl}${path}`} className='hover:underline'>
                  {`Switch to ${refreshBranch}`}
                </Link>
                )
              </p>
            </div>
          </div>

          <ThemeSwitch />
          <div className='mt-7 pt-3 border-t border-gray flex flex-col'>
            <div className='text-black/[.5] dark:text-white/[.5] w-full sm:w-3/5 text-sm'>
              <h6 className='font-black'>Privacy Policy</h6>
              <p>
                BlockOutClub is committed to ensuring the privacy of user
                information. We only collect necessary data when an account is
                linked, and this information is accessible through the public
                APIs. Some records related to user login, such as username, may
                also be retained to enhance user experience.
              </p>
            </div>
            <div className='mt-5'>
              <p className='text-black/[.6] dark:text-white/[.6] font-bold'>
                Copyright © {currentYear} Block Out Club
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
