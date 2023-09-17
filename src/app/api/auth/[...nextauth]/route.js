import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_OAUTH2_CLIENT_ID,
      clientSecret: process.env.DISCORD_OAUTH2_CLIENT_SECRET,
    }),
  ],
  callbacks: {
	async signIn({ user, account, profile, email, credentials }) {
        return true
      },
      async redirect({ url, baseUrl }) {
        return baseUrl
      },
	  async jwt({ token, user, account, profile, isNewUser }) {
		if (profile) {
			token.profileInfo = {
				id: profile.id,
				discriminator: profile.discriminator,
			}
		}
		
        return token
      },
      async session({ session, user, token }) {
		session.user.discriminator = token.profileInfo?.discriminator || null
		session.user.id = token.profileInfo?.id || null
        return session
      }
  }
}

const handler = NextAuth(authOptions)

export { authOptions }

export { handler as GET, handler as POST }