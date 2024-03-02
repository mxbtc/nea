import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			require: true
		},
		userId: {
			required: true,
			type: mongoose.Types.ObjectId
		},
		channelId: {
			type: mongoose.Types.ObjectId,
			required: true
		}
	},
	{ timestamps: true }
)

module.exports = mongoose.models.messages || mongoose.model('messages', MessageSchema)