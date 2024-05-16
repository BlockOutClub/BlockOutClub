import { useState } from 'react';
import Select, { MultiValue } from 'react-select';

import { Facebook, Instagram, X } from '@components/svgs/socials';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  username: string;
  platform: string;
  avatar_url: string;
  keywords: string[];
  tag?: string;
}

const users: User[] = [
  {
    id: 'a1b2c3',
    name: 'Alice Johnson',
    username: '@alicej',
    platform: 'Instagram',
    avatar_url: 'https://picsum.photos/101',
    keywords: ['zionist', 'supporting Zionism', 'Israeli army'],
    tag: 'zionist'
  },
  {
    id: 'd4e5f6',
    name: 'Bob Smith',
    username: '@bobsmith',
    platform: 'Twitter',
    avatar_url: 'https://picsum.photos/102',
    keywords: ['killing children', 'genocide', 'war crimes'],
    tag: 'child-killer'
  },
  {
    id: 'g7h8i9',
    name: 'Charlie Brown',
    username: '@charlieb',
    platform: 'Facebook',
    avatar_url: 'https://picsum.photos/103',
    keywords: ['Israeli army', 'genocide', 'supporting Zionism'],
    tag: 'Israeli army'
  },
  {
    id: 'j1k2l3',
    name: 'David Lee',
    username: '@davidlee',
    platform: 'Instagram',
    avatar_url: 'https://picsum.photos/104',
    keywords: ['genocide', 'war crimes', 'killing children'],
    tag: 'genocide'
  },
  {
    id: 'm4n5o6',
    name: 'Emma Davis',
    username: '@emmad',
    platform: 'Twitter',
    avatar_url: 'https://picsum.photos/105',
    keywords: ['supporting Zionism', 'zionist', 'Israeli army'],
    tag: 'zionist'
  },
  {
    id: 'p7q8r9',
    name: 'Frank Miller',
    username: '@frankm',
    platform: 'Facebook',
    avatar_url: 'https://picsum.photos/106',
    keywords: ['war crimes', 'genocide', 'killing children'],
    tag: 'genocide'
  },
  {
    id: 's1t2u3',
    name: 'Grace Wilson',
    username: '@gracew',
    platform: 'Instagram',
    avatar_url: 'https://picsum.photos/107',
    keywords: ['zionist', 'supporting Zionism', 'Israeli army'],
    tag: 'zionist'
  },
  {
    id: 'v4w5x6',
    name: 'Henry Taylor',
    username: '@henryt',
    platform: 'Twitter',
    avatar_url: 'https://picsum.photos/108',
    keywords: ['killing children', 'genocide', 'war crimes'],
    tag: 'child-killer'
  },
  {
    id: 'y7z8a1',
    name: 'Isabella Martinez',
    username: '@isabellam',
    platform: 'Facebook',
    avatar_url: 'https://picsum.photos/109',
    keywords: ['Israeli army', 'genocide', 'supporting Zionism'],
    tag: 'Israeli army'
  },
  {
    id: 'b2c3d4',
    name: 'Jack Anderson',
    username: '@jacka',
    platform: 'Instagram',
    avatar_url: 'https://picsum.photos/110',
    keywords: ['genocide', 'war crimes', 'killing children'],
    tag: 'genocide'
  },
  {
    id: 'e5f6g7',
    name: 'Katherine Lewis',
    username: '@katherinel',
    platform: 'Twitter',
    avatar_url: 'https://picsum.photos/111',
    keywords: ['supporting Zionism', 'zionist', 'Israeli army'],
    tag: 'zionist'
  },
  {
    id: 'h8i9j1',
    name: 'Liam King',
    username: '@liamk',
    platform: 'Facebook',
    avatar_url: 'https://picsum.photos/112',
    keywords: ['war crimes', 'genocide', 'killing children'],
    tag: 'genocide'
  },
  {
    id: 'k2l3m4',
    name: 'Mia Scott',
    username: '@mias',
    platform: 'Instagram',
    avatar_url: 'https://picsum.photos/113',
    keywords: ['zionist', 'supporting Zionism', 'Israeli army'],
    tag: 'zionist'
  },
  {
    id: 'n5o6p7',
    name: 'Noah Young',
    username: '@noahy',
    platform: 'Twitter',
    avatar_url: 'https://picsum.photos/114',
    keywords: ['killing children', 'genocide', 'war crimes'],
    tag: 'child-killer'
  },
  {
    id: 'q8r9s1',
    name: 'Olivia Hill',
    username: '@oliviah',
    platform: 'Facebook',
    avatar_url: 'https://picsum.photos/115',
    keywords: ['Israeli army', 'genocide', 'supporting Zionism'],
    tag: 'Israeli army'
  },
  {
    id: 't2u3v4',
    name: 'Paul Wright',
    username: '@paulw',
    platform: 'Instagram',
    avatar_url: 'https://picsum.photos/116',
    keywords: ['genocide', 'war crimes', 'killing children'],
    tag: 'genocide'
  },
  {
    id: 'w5x6y7',
    name: 'Quinn Allen',
    username: '@quinna',
    platform: 'Twitter',
    avatar_url: 'https://picsum.photos/117',
    keywords: ['supporting Zionism', 'zionist', 'Israeli army'],
    tag: 'zionist'
  },
  {
    id: 'z8a1b2',
    name: 'Rebecca Evans',
    username: '@rebeccae',
    platform: 'Facebook',
    avatar_url: 'https://picsum.photos/118',
    keywords: ['war crimes', 'genocide', 'killing children'],
    tag: 'genocide'
  },
  {
    id: 'c3d4e5',
    name: 'Sam Green',
    username: '@samg',
    platform: 'Instagram',
    avatar_url: 'https://picsum.photos/119',
    keywords: ['zionist', 'supporting Zionism', 'Israeli army'],
    tag: 'zionist'
  },
  {
    id: 'f6g7h8',
    name: 'Tina Hall',
    username: '@tinah',
    platform: 'Twitter',
    avatar_url: 'https://picsum.photos/120',
    keywords: ['genocide', 'war crimes', 'killing children'],
    tag: 'genocide'
  }
];

export const Selector = () => {
  const [userList, setUserList] = useState<MultiValue<User>>([]);

  const allSelected = userList.length === users.length;

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
            value={userList}
            onChange={setUserList}
            options={users}
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
            className={`w-full md:w-24 lg:w-32 font-meduim rounded-2xl py-5 border ${allSelected ? 'border-red-500 text-red-500 dark:text-red-400 dark:border-red-400' : 'border-black/[.7] dark:border-white/[.7]'}`}
            onClick={() => {
              if (allSelected) {
                setUserList([]);
              } else {
                setUserList(users);
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
        <span>Selected users:</span>
        <pre>{JSON.stringify(userList, null, 2)}</pre>
      </div>
    </>
  );
};
