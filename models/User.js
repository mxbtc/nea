import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true
		},
		password: {
            type: String,
            required: true
        },
        channels: {
            type: [Number]
        }
	}
)

module.exports = mongoose.models.user || mongoose.model('user', UserSchema)