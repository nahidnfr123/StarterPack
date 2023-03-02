import NextAuth from "next-auth"
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
// import EmailProvider from 'next-auth/providers/email'

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    // OAuth authentication providers
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // Sign in with passwordless email link
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "<no-reply@example.com>",
    // }),
  ],
})
