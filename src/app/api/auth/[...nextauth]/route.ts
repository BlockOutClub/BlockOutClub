import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0'
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, profile, trigger }) {
      if (trigger === 'signIn' && profile) {
        user.image = user.image?.replace('_normal', '_400x400');
        user = { ...user, username: profile.data.username };
        user.url = user.username
          ? `https://x.com/${user.username}`
          : 'https://x.com/BlockOutClub';
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      return Promise.resolve({ ...session, user: { ...token.user } });
    }
  }
});

export { handler as GET, handler as POST };