import {NuxtAuthHandler} from '#auth'
import GithubProvider from 'next-auth/providers/github'

const {passport, authSecret} = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: authSecret,
  providers: [
    GithubProvider.default({
      clientId: 'enter-your-client-id-here',
      clientSecret: 'enter-your-client-secret-here'
    }),
    {
      id: "laravelPassport", //ID is only used for the callback URL
      name: "Passport", // name is used for the login button
      type: "oauth", // connexion type
      version: "2.0",// oauth version
      authorization: {
        url: `${passport.baseUrl}oauth/authorize`, // this is the route created by passport by default to get the autorization code
        params: {
          scope: "*", // this is the wildcard for all scopes in laravel passport, you can specify scopes separated by a space
        }
      },
      token: {
        url: `${passport.baseUrl}oauth/token`, // this is the default route created by passport to get and renew the tokens
      },
      clientId: passport.clientId, // the client Id
      clientSecret: passport.clientSecret,// the client secret
      userinfo: {
        url: `${passport.baseUrl}api/user`,// this is a custom route that must return the current user that must be created in laravel
      },
      profile: (profile) => {
        // map the session fields with you laravel fields
        // profile is the user coming from the laravel app
        // update the return with your own fields names
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
        };
      },
      idToken: false,
    }
  ]
})
