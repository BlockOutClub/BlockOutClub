import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

import { ImageLoadingContainer } from '@components/image-loading-container';

type Props = {
  status: 'authenticated' | 'loading' | 'unauthenticated';
  data: Session | null;
};

export const UserProfile: React.FC<Props> = (props) => {
  const { status, data } = props;

  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className='w-10 h-10 border border-gray rounded-xl opacity-70 flex justify-center items-center animate-pulse bg-neutral-200 dark:bg-neutral-700'>
        <div className='w-4 h-3 inverted rounded-full animate-spin' />
      </div>
    );
  }

  return (
    <>
      {status === 'unauthenticated' && (
        <button
          className='w-10 h-10 rounded-xl animated-click inverted'
          onClick={() => signIn('twitter', { callbackUrl: '/' })}>
          +
        </button>
      )}
      {status === 'authenticated' && data?.user && (
        <>
          <div ref={dropdownRef} className='relative'>
            <div
              className='w-10 h-10 border border-gray rounded-xl flex justify-center items-center overflow-hidden transition-transform scale-100 hover:scale-105 active:scale-95 ease-in-out'
              onClick={() => setDropdownVisible(!dropdownVisible)}>
              <img
                className={`object-cover ${loading ? 'hidden' : 'block'}`}
                width={100}
                height={100}
                src={data.user.image!}
                alt={`${data.user.name!}'s avatar`}
                onLoad={() => setLoading(false)}
              />
              {loading && <ImageLoadingContainer />}
            </div>

            {dropdownVisible && (
              <div className='absolute inverted overflow-hidden -right-4 top-7 py-5 px-3 rounded-xl z-10 shadow-3xl border border-gray my-4 w-72'>
                <div className='grid grid-cols-1 gap-2'>
                  <div className='inline-flex gap-4 items-center'>
                    <div className='w-20 h-20 border inverted-border rounded-3xl flex justify-center items-center overflow-hidden'>
                      <img
                        className={`object-cover ${loading ? 'hidden' : 'block'}`}
                        width={200}
                        height={200}
                        src={data.user.image!}
                        alt={`${data.user.name!}'s avatar`}
                        onLoad={() => setLoading(false)}
                      />
                    </div>

                    <div>
                      <h3 className='w-full text-base font-semibold'>
                        {data.user.name}
                      </h3>

                      <pre className='w-full text-xs font-mono'>
                        {`@${data.user.username}`}
                      </pre>
                    </div>
                  </div>
                  <div className='h-5' />

                  <Link
                    className='inline-flex justify-center items-center gap-3 w-full text-sm px-4 py-2 border invered-border rounded-full animated-click'
                    href={data.user.url}
                    target='_blank'>
                    View on X
                    <span>
                      <svg
                        className='w-4'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'>
                        <path d='M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z' />
                      </svg>
                    </span>
                  </Link>

                  <button
                    className='w-full text-sm px-4 py-2 default rounded-full animated-click'
                    onClick={() => {
                      signOut();
                      setDropdownVisible(!dropdownVisible);
                    }}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
