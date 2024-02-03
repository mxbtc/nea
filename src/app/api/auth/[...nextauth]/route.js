import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


const authOptions = {
	providers: [
		CredentialsProvider({
			// Name of the form
		  	name: "Credentials",
		  	// Use these values to create a form
		 	credentials: {
				username: { label: "Username", type: "text" },
				password: {  label: "Password", type: "password" }
		  	},
		  	// function to authorise user when signing in
		  	async authorize(credentials, req) {
				// Placeholder data for prototype
				const user = { id: "1", name: "example", email: "example@example.com" }
				if (user) {
					// Save session if there is a user
			  		return user
				} else {
			  		// Returns error since user doesn't exist
			  		return null
				}
		  	}
		})
	],
}
// Exporting the user handler
const handler = NextAuth(authOptions)

export { authOptions }
// Different HTTP methods
export { handler as GET, handler as POST }