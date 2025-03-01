import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "../../../lib/db"

// export const authOptions: NextAuthOptions = {
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! })],
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async session({ token, session }) {
//       if (session.user && token.sub) (session.user as { id: string }).id = token.sub
//       return session
//     },
//     async jwt({ token, user }) {
//       if (user) token.sub = user.id
//       return token
//     }
//   }
// }

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! })],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ token, session }) {
      if (session.user && token.sub) (session.user as { id: string }).id = token.sub
      return session
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id
      return token
    }
  }
}

export default NextAuth(authOptions)