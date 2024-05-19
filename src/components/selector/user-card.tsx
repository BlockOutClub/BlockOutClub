'use client';

import { useState } from 'react';
import { SocialIcon } from './icons';
import { ImageLoadingContiner } from './image-loading-container';

import { User } from 'boc';

type Props = {
  user: User;
  className?: string;
  children?: React.ReactNode;
};

// eslint-disable-next-line no-unused-vars
export const UserCard: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(true);

  return (
    <li
      className={`inline-flex w-full justify-between items-center ${props?.className || ''}`}>
      <div className='inline-flex gap-4'>
        {props?.children}
        <div className='w-16 h-16 overflow-hidden shadow-sm rounded-xl ring-black/[.2] dark:ring-white/[.2] ring-1 '>
          <img
            className={`object-cover ${loading ? 'hidden' : 'block'}`}
            width={100}
            height={100}
            src={props.user.image}
            alt={`${props.user.name}'s avatar`}
            onLoad={() => setLoading(false)}
          />
          <ImageLoadingContiner />
        </div>

        <div>
          <p className='text-sm'>{props.user.name}</p>
          <p className='text-xs'>{props.user.username}</p>
          <label className='p-1 px-2 font-medium rounded-md text-xs bg-black text-white dark:bg-white/[.8] dark:text-black'>
            {props.user?.tag}
          </label>
        </div>
      </div>
      <SocialIcon platform={props.user.platform} />
    </li>
  );
};
