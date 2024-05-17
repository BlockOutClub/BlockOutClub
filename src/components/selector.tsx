import { Dispatch, SetStateAction, useState } from 'react';
import Link from 'next/link';
import Select, { MultiValue } from 'react-select';

import { Facebook, Instagram, X } from '@components/svgs/socials';

import { User } from 'boc';

type Props = {
  list: User[];
  selected: MultiValue<User>;
  setSelected: Dispatch<SetStateAction<MultiValue<User>>>;
};

export const Selector: React.FC<Props> = (props) => {
  const [selectionMode, setSelectionMode] = useState(false);

  const allSelected = props.selected.length === props.list.length;

  const handleCheckboxClick = (user: User) => {
    if (props.selected.includes(user)) {
      props.setSelected(
        props.selected.filter((selectedUser) => selectedUser.id !== user.id)
      ); // Remove user
    } else {
      props.setSelected([...props.selected, user]); // Add user
    }
  };
  const filterUsers = (
    option: { value: string; label: string; data: User },
    input: string
  ) => {
    if (!input) return true;
    const lowerInput = input.toLowerCase();
    const { name: label, username, platform, keywords, tag } = option.data;

    return (
      label.toLowerCase().includes(lowerInput) ||
      username.toLowerCase().includes(lowerInput) ||
      platform.toLowerCase().includes(lowerInput) ||
      (tag && tag.toLowerCase().includes(lowerInput)) ||
      keywords.some((keyword) => keyword.toLowerCase().includes(lowerInput))
    );
  };

  return (
    <>
      <div className='mt-10 md:flex md:justify-between md:items-center md:gap-4'>
        <div className='w-full'>
          <Select
            filterOption={filterUsers}
            className='react-select-container'
            classNamePrefix='react-select'
            isSearchable
            value={props.selected}
            onChange={props.setSelected}
            options={props.list}
            isMulti
            getOptionLabel={(user) => user.name}
            getOptionValue={(user) => user.id}
            formatOptionLabel={(user, { context }) => {
              if (context === 'menu') {
                return (
                  <div className='flex items-center p-4 border rounded-xl dark:border-white/[.1]'>
                    <img
                      className='w-20 rounded-3xl mr-5'
                      src={user.avatar_url}
                      alt={user.name}
                    />
                    <div>
                      <h5 className='font-bold'>{user.name}</h5>
                      <div className='mt-1 inline-flex items-center gap-2'>
                        {user.platform.toLowerCase() === 'instagram' ? (
                          <Instagram />
                        ) : user.platform.toLowerCase() === 'twitter' ? (
                          <X />
                        ) : (
                          <Facebook />
                        )}
                        <Link
                          className='text-sm font-mono hover:underline'
                          href='https://example.com'
                          target='_blank'>
                          {user.username}
                        </Link>
                      </div>
                      {user?.tag && (
                        <div className='mt-1 bg-red-400 text-xs rounded-lg px-2 text-center font-bold py-1'>
                          <p>{user.tag}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              return user.name;
            }}
          />
        </div>
        <div className='flex justify-between gap-4 py-5 md:py-0'>
          <button
            className='w-full md:w-24 lg:w-32 font-bold bg-black text-white dark:bg-white dark:text-black rounded-2xl py-5 shadow-sm'
            onClick={() => console.log('Blocked', props.selected)}>
            Block
          </button>
        </div>
      </div>

      <div className='px-2'>
        <h2 className='my-5 text-2xl font-bold mb-4'>Users:</h2>
        <div className='my-5 border border-neutral-200 dark:border-neutral-700 rounded-2xl bg-white dark:bg-neutral-900'>
          <div className='grid divide-y divide-double divide-neutral-200 dark:divide-neutral-700'>
            <div className='flex justify-between mt-2 p-3 overflow-hidden'>
              {selectionMode ? (
                <p className='ml-4 font-medium'>
                  {props.selected.length} Selected
                </p>
              ) : (
                <span></span>
              )}

              <div className='inline-flex gap-3'>
                {selectionMode && (
                  <button
                    className={`rounded-xl py-1 px-4 border ${allSelected ? 'border-red-500 text-red-500 dark:text-red-400 dark:border-red-400' : ''}`}
                    onClick={() => {
                      if (allSelected) {
                        props.setSelected([]);
                      } else {
                        props.setSelected(props.list);
                      }
                    }}>
                    {allSelected ? 'Clear' : 'Select All'}
                  </button>
                )}
                <button
                  className='rounded-xl py-1 px-4 border'
                  onClick={() => setSelectionMode(!selectionMode)}>
                  {selectionMode ? 'Cancel' : 'Select'}
                </button>
              </div>
            </div>

            {props.list.map((user) => {
              const selected = props.selected.includes(user);
              return (
                <div
                  className={`inline-flex justify-between items-center p-6 ${selected ? 'bg-gray-100 dark:bg-white/[.1]' : ''}`}>
                  <div key={user.id} className='inline-flex gap-4'>
                    {selectionMode && (
                      <input
                        type='checkbox'
                        checked={selected}
                        onClick={() => handleCheckboxClick(user)}
                      />
                    )}
                    <img
                      className='w-14 h-14 rounded-xl object-cover shadow-sm'
                      src={user.avatar_url}
                      alt={`${user.name}'s avatar`}
                    />
                    <div>
                      <label className='text-sm'>{user.name}</label>
                      <p className='text-xs'>{user.username}</p>
                    </div>
                  </div>
                  <p className='text-xs'>{user.platform}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
