import { useState } from 'react';
import Select, { MultiValue } from 'react-select';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'user1', label: 'User1' },
  { value: 'user2', label: 'User2' },
  { value: 'user3', label: 'User3' },
  { value: 'user4', label: 'User4' }
];

export const Selector = () => {
  const [userList, setUserList] = useState<MultiValue<Option>>([]);

  const allSelected = userList.length === options.length;

  return (
    <>
      <div className='mt-10 md:flex md:justify-between md:items-center md:gap-4'>
        <div className='w-full'>
          <Select
            className='react-select-container'
            classNamePrefix='react-select'
            value={userList}
            onChange={(v) => setUserList(v)}
            options={options}
            closeMenuOnSelect={false}
            isMulti
          />
        </div>
        <div className='flex justify-between gap-4 py-5 md:py-0'>
          <button
            className={`w-full md:w-24 lg:w-32 font-meduim rounded-2xl py-5 border ${allSelected ? 'border-red-500 text-red-500 dark:text-red-400 dark:border-red-400' : 'border-black/[.7] dark:border-white/[.7]'}`}
            onClick={() => {
              if (allSelected) {
                setUserList([]);
              } else {
                setUserList(options);
              }
            }}>
            {allSelected ? 'Clear' : 'Select All'}
          </button>
          <button
            className='w-full md:w-24 lg:w-32 font-bold bg-black text-white dark:bg-white dark:text-black rounded-2xl py-5'
            onClick={() => console.log('Blocked', userList)}>
            Block
          </button>
        </div>
      </div>
      <div className='mt-4'>
        <span>Selected option:</span>
        <pre>{JSON.stringify(userList, null, 2)}</pre>
      </div>
    </>
  );
};
