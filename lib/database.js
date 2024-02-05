import mongoose from 'mongoose'
import Users from '../models/User'
// URL to database
const MONGODB_URI = process.env.MONGODB_URI
// Latest cached connection
let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect () {
	if (cached.conn) {
		return cached.conn // Cached connection if there is one
	}

	if (!cached.promise) {
		const opts = {
		}

		cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
			return mongoose
		})
	}
	cached.conn = await cached.promise
	return cached.conn
}

async function checkEmailExists(email) {
	await dbConnect()

	let checkUser = await Users.findOne(
		{
		  email: email
		}
	  ).exec()

	return checkUser ? true : false
}

export {checkEmailExists as checkEmailExists} 

export { dbConnect as connection }

export default dbConnect