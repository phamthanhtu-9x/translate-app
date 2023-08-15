import GoogleProvider from 'next-auth/providers/google';
import {NuxtAuthHandler} from '#auth';
const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],

  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({token, account, user}) => {
      const isSignIn = !!user;
      if (isSignIn) {
        token.jwt = user ? (user as any).access_token || '' : '';
        token.id = user ? user.id || '' : '';
        token.role = user ? (user as any).role || '' : '';
        token.access_token = account ? (account as any).access_token || '' : '';

        const headers = {
          Authorization: `Bearer ${token.access_token}`,
        };

        const jwt = await $fetch(runtimeConfig.public.apiBase + '/api/auth/login/google/callback', {
          headers,
        });
        token.access_token = jwt;
      }

      return Promise.resolve(token);
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: ({session, token}) => {
      (session as any).role = token.role;
      (session as any).uid = token.id;
      (session as any).access_token = token.access_token;

      return Promise.resolve(session);
    },
  },
});
