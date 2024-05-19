import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Profile extends Profile {
    data: {
      id: string;
      name: string;
      username: string;
      profile_image_url: string;
    };
  }

  interface User extends User {
    username?: string;
  }

  interface Session extends Session {
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends JWT {
    user?: User;
  }
}
