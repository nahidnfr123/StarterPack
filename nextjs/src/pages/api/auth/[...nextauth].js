import NextAuth from "next-auth"
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import $api from "../../../lib/request";

// Credentials Provider with custom banckend Doc:...
// https://dev.to/twisha/using-credentials-provider-with-a-custom-backend-in-nextauth-js-43k4

const providers = [
  // OAuth authentication providers
  // AppleProvider({
  //   clientId: process.env.APPLE_ID,
  //   clientSecret: process.env.APPLE_SECRET,
  // }),
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
    authorize: async (credentials, req) => {
      const response = await $api.post('login', {email: credentials.email, password: credentials.password})
      if (response.message === 'success') return response?.data?.user
      else return null
    }
  }),
]

const callbacks = {
  // Getting the JWT token from API response
  async jwt(token, user) {
    console.log('Hello This is console.')
    console.log(user)
    console.log(token)
    if (user) {
      token.accessToken = user.token
    }

    return token
  },

  async session(session, token) {
    session.accessToken = token?.accessToken
    console.log(session)
    return session
  }
}

const options = {
  secret: process.env.SECRET,
  providers,
  callbacks
}

export default (req, res) => NextAuth(req, res, options)
