import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { connection } from "../../../../../lib/database"
import User from "../../../../../models/User"
import { hashData } from '../../../../../lib/utils'

const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
		  	// function to authorise user when signing in
		  	async authorize(credentials, req) {
				await connection()
				// CHeck if user exists
				let findUser = await User.findOne({
					email: credentials.email.toLowerCase(),
					username: credentials.username,
					password: hashData(credentials.password)
				})
				
				if (findUser) {
					let id = findUser._id.toString();
					let email = findUser.email
					let username = findUser.username
					// Had to use name as anything else doesn't work
					let user = {
						name: `${id} ${email} ${username}`
					}
					// Save session if there is a user
			  		return user
				} else {
			  		// Returns error since user doesn't exist
			  		return '/sign-in?error'
				}
		  	},
		})
	],
	pages: {
		signIn: '/sign-in',
		error: '/sign-in'
	}
}
// Exporting the user handler
const handler = NextAuth(authOptions)

export { authOptions }
// Different HTTP methods
export { handler as GET, handler as POST }