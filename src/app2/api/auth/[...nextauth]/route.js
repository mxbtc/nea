import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../../lib/mongodb"
import dbConnect from "../../../../../lib/database"
import { Model, Models, model } from "mongoose"
import User from "../../../../../models/User.js"

const authOptions = {
  pages: {
  },
  adapter: MongoDBAdapter(clientPromise, {

  }),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email"},
        username: { label: "Username", type: "text"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, username, password } = credentials

        await dbConnect();

        const user = await User.fin

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // Set it as jwt instead of database
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.accessToken = user.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    },
  },
}

const handler = NextAuth(authOptions)

export { authOptions }

export { handler as GET, handler as POST }