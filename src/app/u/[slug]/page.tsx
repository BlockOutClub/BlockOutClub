'use client';

import { useState } from 'react';

import { ImageLoadingContainer } from '@components/image-loading-container';
import { searchUser } from '@utils/searchUser';

type Props = {
  params: { slug?: string };
};

export default function Page(props: Props) {
  const slug = props.params.slug;
  const user = searchUser(slug);

  const [loading, setLoading] = useState(true);

  return (
    <section className='container mx-auto max-w-3xl md:max-w-6xl mt-52 p-8 md:p-20'>
      {user ? (
        <div className='flex border border-gray rounded-3xl p-4 -mt-20'>
          <div className='flex flex-col w-full'>
            <div className='w-40 md:w-72 h-40 md:h-72 border border-gray rounded-3xl flex justify-center items-center overflow-hidden'>
              <img
                className={`object-cover ${loading ? 'hidden' : 'block'}`}
                src={user.image!}
                alt={`${user.name!}'s avatar`}
                onLoad={() => setLoading(false)}
              />
              {loading && <ImageLoadingContainer />}
            </div>

            <div className='p-2 md:py-5 md:px-2'>
              <h3 className='text-lg md:text-3xl font-semibold'>{user.name}</h3>
              <pre className='font-mono text-xs md:text-base'>{`@${user.username}`}</pre>
            </div>
          </div>
        </div>
      ) : (
        <div className='p-5 border border-gray rounded-xl text-center'>
          <h2 className='text-4xl font-bold tracking-tight'>User Not Found</h2>
          <p className='mt-2'> 404</p>
        </div>
      )}
    </section>
  );
}
