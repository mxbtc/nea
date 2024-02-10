import mongoose from 'mongoose'
// The schema ensures that the inputs match the data types and is inputted
const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		},
		password: {
            type: String,
            required: true
        },
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.models.users || mongoose.model('users', UserSchema)