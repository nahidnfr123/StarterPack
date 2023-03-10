import NextAuth from "next-auth"
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import $api, {setTokenToCookie} from "../../../lib/request";
import Cookies from 'cookies';

// Credentials Provider with custom banckend Doc:...
// https://dev.to/twisha/using-credentials-provider-with-a-custom-backend-in-nextauth-js-43k4

const nextAuthOptions = (req, res) => {
  return {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      // OAuth authentication providers
      // FacebookProvider({
      //   clientId: process.env.FACEBOOK_ID,
      //   clientSecret: process.env.FACEBOOK_SECRET
      // }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      }),
      CredentialsProvider({
        name: 'Credentials',
        id: "login",
        credentials: {
          email: {label: "Email", type: "email", placeholder: "name"},
          password: {label: "Password", type: "password"}
        },
        authorize: async (credentials, req) => {
          const response = await $api.post('login', {email: credentials.email, password: credentials.password})
          if (response.message === 'success') {
            const cookies = new Cookies(req, res);
            cookies.set('myCookie', response?.data?.token);
            return {...response?.data?.user, token: response?.data?.token || ''}
          } else if (response.message === 'error') {
            throw new Error(JSON.stringify(response?.data))
          } else return null
        }
      }),
      CredentialsProvider({
        name: 'Credentials',
        id: "register",
        authorize: async (credentials, req) => {
          const response = await $api.post('register', {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.password_confirmation
          })
          console.log(response?.data)
          if (response.message === 'success') {
            const cookies = new Cookies(req, res);
            cookies.set('myCookie', response?.data?.token);
            return response?.data?.user
          } else if (response.message === 'error') {
            throw new Error(JSON.stringify(response?.data))
          } else return null
        }
      }),
    ],
    callbacks: {
      async signIn({user}) {
        // For social auth ... You may store the user data in your api end point ...
        // Request code goes here ...
        return !!user;
      },
      async jwt({token, user, account, profile, isNewUser}) {
        return {...token, ...user};
      },
      async session({session, user, token}) {
        session.user = {...session.user, ...token}
        session.accessToken = session?.user?.token
        session.user.isLoggedIn = true;
        return session;
      },
    },
  }
}

const abc = (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}

export default abc
