'use client';

import './styles.css';

import { Dispatch, SetStateAction, useState } from 'react';
import Select, { MultiValue } from 'react-select';

import { MessageBox } from './message-box';

import { filterUsers } from '@utils/filterUsers';
import { blockUsers } from '@utils/blockUsers';

import { MessageObj, User } from 'boc';
import { UserCard } from './user-card';

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
            instanceId='slector1'
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
                  <UserCard
                    key={`filter-${user.id}`}
                    className='py-4 px-6 border-b border-gray'
                    user={user}
                  />
                );
              }
              return user.name;
            }}
          />
        </div>
        <div className='flex justify-between gap-4 py-5 md:py-0'>
          <button
            className='w-full md:w-24 lg:w-32 font-bold inverted rounded-2xl py-5 shadow-sm'
            onClick={() => handleBlockButtonClick()}>
            Block
          </button>
        </div>
      </div>

      <MessageBox msg={msg} setMsg={setMsg} />

      <div className='pt-1 mt-8 border border-gray rounded-2xl bg-white dark:bg-neutral-900 overflow-hidden'>
        <div className='grid divide-y divide-double divide-neutral-200 dark:divide-neutral-700'>
          <div className='flex justify-between mt-2 py-3 px-4'>
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
              <UserCard
                key={user.id}
                className={`py-3 px-6 ${selected ? ' bg-black/[.05] dark:bg-white/[.1]' : ''}`}
                user={user}>
                {selectionMode && (
                  <input
                    key={user.id}
                    type='checkbox'
                    checked={selected}
                    onChange={() => handleCheckboxClick(user)}
                  />
                )}
              </UserCard>
            );
          })}
        </div>
      </div>
    </>
  );
};
