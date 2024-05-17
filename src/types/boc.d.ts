declare module 'boc' {
  interface User {
    id: string;
    name: string;
    username: string;
    platform: string;
    avatar_url: string;
    keywords: string[];
    tag?: string;
  }
}

