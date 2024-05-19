declare module 'boc' {
  interface User {
    id: string;
    name: string;
    username: string;
    platform: string;
    image: string;
    keywords: string[];
    tag?: string;
  }

  type MessageObj = {
    text: string;
    [k: string]: any;
  };
}
