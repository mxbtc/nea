import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../../lib/mongodb"
import dbConnect from "../../../../../lib/dbConnect"

const authOptions = {
  pages: {
  },
  adapter: MongoDBAdapter(clientPromise, {

  }),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Aaron" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Find your user in the database using MongoDBAdapter
        const user = await authOptions.adapter.getUser(
          "6471f710f772cf139bc5142e"
        );
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