import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true
		},
		content: {
			type: String,
			require: true
		},
        channel: {
            type: Number,
			required: true
        },
		messageID: {
			type: Number
		}
	}
)

module.exports = mongoose.models.message || mongoose.model('message', UserSchema)