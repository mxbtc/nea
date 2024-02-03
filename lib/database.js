import mongoose from 'mongoose'
import Users from '../models/User'

const MONGODB_URI = process.env.MONGODB_URI

let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect () {
	if (cached.conn) {
		return cached.conn
	}

	if (!cached.promise) {
		const opts = {
			useNewUrlParser: true, 
			useUnifiedTopology: true,
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