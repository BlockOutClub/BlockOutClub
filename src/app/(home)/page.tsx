'use client';

import { useState } from 'react';
import { MultiValue } from 'react-select';

import { Selector } from '@components/selector';

import users from '@data/users.json';

import { User } from 'boc';

export default function Home() {
  const [selectedList, setSelectedList] = useState<MultiValue<User>>([]);

  return (
    <>
      <section className='flex flex-col container mx-auto w-full h-screen justify-center items-center'>
        <div className='my-auto md:h-auto h-full w-full justify-center items-center flex flex-col'>
          <h1 className='text-5xl md:text-6xl font-black text-center'>
            Raise Your Voice For Palestine
          </h1>

          <div className='pt-5 text-md md:text-xl font-mono inline-flex gap-6'>
            <p>#block2024</p>
            <p>#ArmyToAqsa</p>
            <p>#FreePalestine</p>
          </div>
          <p className='pt-10 text-center sm:w-3/4 lg:w-1/2 text-sm md:text-lg'>
            An Open Source Startup. Exposing Truth, Combatting Fake Accounts and
            Spams, Unveiling Political Agendas through Automated Data Analysis.
          </p>
        </div>
      </section>

      <div className='max-w-5xl p-5 container'>
        <h1 className='text-5xl md:text-6xl font-bold p-5 text-center'>
          Block Falsehood
        </h1>
        <Selector
          list={users}
          selected={selectedList}
          setSelected={setSelectedList}
        />
      </div>
    </>
  );
}
