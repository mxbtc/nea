import mongoose from 'mongoose'

const channelSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
        channelID: {
            type: Number
        }
	}
)

module.exports = mongoose.models.channel || mongoose.model('channel', channelSchema)