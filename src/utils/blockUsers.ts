import { MultiValue } from 'react-select';
import { MessageObj, User } from 'boc';

export const blockUsers = (users: MultiValue<User>): MessageObj => {
  const usersCount = users.length;
  if (usersCount === 0) {
    return {
      text: 'No users selected',
      type: 'note'
    };
  }
  if (usersCount === 1) {
    return {
      text: '[API Error]: Unable to procced request.',
      type: 'error'
    };
  }

  return {
    text: `${usersCount} users blocked`,
    type: 'info'
  };
};
