import { User } from 'boc';

export const filterUsers = (
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
