import {NuxtAuthHandler} from '#auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
  pages: {
    // Change the default behavior to use `/login` as the path for the sign-in page
    signIn: '/login',
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'text', placeholder: ''},
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials: any) {
        const res : any = await $fetch(runtimeConfig.public.apiBase + '/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {'Content-Type': 'application/json'},
        });
        
        return res.data.user;
      },
    }),
  ],

  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    jwt: async ({token, account, user}) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user ? (user as any).access_token || '' : '';
        token.id = user ? user.id || '' : '';
        token.role = user ? (user as any).role || '' : '';
        token.access_token = account ? (account as any).access_token || '' : '';

        if (account?.provider === 'google') {
          const headers = {
            Authorization: `Bearer ${token.access_token}`,
          };

          const jwt = await $fetch(
            runtimeConfig.public.apiBase + '/api/auth/login/google/callback',
            {headers},
          );
          token.access_token = jwt;
        } else {
          console.log('token credentials =', token);
        }
      }


      return Promise.resolve(token);
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    session: async ({session, token}) => {
      (session as any).role = token.role;
      (session as any).uid = token.id;
      (session as any).access_token = token.access_token;

      return Promise.resolve(session);
    },
    async redirect() {
      return '/';
    },
  },
});
