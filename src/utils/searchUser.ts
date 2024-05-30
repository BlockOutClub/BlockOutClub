import users from '@data/users.json';

import { User } from 'boc';

export const searchUser = (slug?: string): User | undefined => {
  if (!slug) return;

  slug = decodeURIComponent(slug);

  if (slug.match('@')) {
    slug = slug.split('@')[1];
  }

  const lowerSlug = slug.toLowerCase();
  const user = users.filter((e) => e.username === lowerSlug)[0];

  return user;
};
