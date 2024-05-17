import './styles.css';

import { Dispatch, SetStateAction, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import Link from 'next/link';

import { SocialIcon } from './icons';
import { MessageBox } from './message-box';

import { filterUsers } from '@utils/filterUsers';
import { blockUsers } from '@utils/blockUsers';

import { MessageObj, User } from 'boc';

type Props = {
  list: User[];
  selected: MultiValue<User>;
  setSelected: Dispatch<SetStateAction<MultiValue<User>>>;
};

export const Selector: React.FC<Props> = (props) => {
  const [selectionMode, setSelectionMode] = useState(false);
  const [msg, setMsg] = useState<MessageObj>({ text: '' });

  const selectedCount = props.selected.length;

  const handleCheckboxClick = (user: User) => {
    if (props.selected.includes(user)) {
      // Remove user
      props.setSelected(props.selected.filter((u) => u.id !== user.id));
    } else {
      // Add user
      props.setSelected([...props.selected, user]);
    }
  };

  const handleBlockButtonClick = () => {
    try {
      setMsg(blockUsers(props.selected));
    } catch (e) {
      const error = e as Error;
      setMsg({
        type: 'error',
        text: error.message
      });
    }
  };

  return (
    <>
      <div className='mt-10 md:flex md:justify-between md:items-center md:gap-4'>
        <div className='w-full'>
          <Select
            isMulti
            isSearchable
            filterOption={filterUsers}
            className='react-select-container'
            classNamePrefix='react-select'
            value={props.selected}
            onChange={props.setSelected}
            options={props.list}
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
                        <SocialIcon platform={user.platform} />
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
            onClick={() => handleBlockButtonClick()}>
            Block
          </button>
        </div>
      </div>

      <MessageBox msg={msg} setMsg={setMsg} />

      <div className='px-2 my-5 border border-neutral-200 dark:border-neutral-700 rounded-2xl bg-white dark:bg-neutral-900'>
        <div className='grid divide-y divide-double divide-neutral-200 dark:divide-neutral-700'>
          <div className='flex justify-between mt-2 p-3 overflow-hidden'>
            <p className='ml-4 font-medium'>
              {selectionMode
                ? `${selectedCount} Selected`
                : 'Featured Block List'}
            </p>

            <div className='inline-flex gap-3'>
              {selectedCount >= 1 && !selectionMode && (
                <button
                  className='option-button'
                  onClick={() => {
                    props.setSelected([]);
                  }}>
                  Clear
                </button>
              )}
              {selectionMode && (
                <>
                  <button
                    className='option-button'
                    onClick={() => {
                      props.setSelected(props.list);
                    }}>
                    Select All
                  </button>
                  <button
                    className='option-button disabled:opacity-50'
                    disabled={selectedCount === 0}
                    onClick={() => {
                      props.setSelected([]);
                      setSelectionMode(false);
                    }}>
                    Deselect All
                  </button>
                </>
              )}
              <button
                className={`option-button ${selectionMode ? 'option-button-filled' : ''}`}
                onClick={() => setSelectionMode(!selectionMode)}>
                {selectionMode ? 'Done' : 'Select'}
              </button>
            </div>
          </div>

          {props.list.map((user) => {
            const selected = props.selected.includes(user);
            return (
              <div
                className={`inline-flex justify-between items-center p-6 ${selected ? 'bg-black/[.05] dark:bg-white/[.1]' : ''}`}>
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
                <SocialIcon platform={user.platform} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
