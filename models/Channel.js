import mongoose from 'mongoose'
// The schema ensures that the inputs match the data types and is inputted
const ChannelSchema = new mongoose.Schema(
	{
		name: {
			type: mongoose.Schema.Types.String,
			required: true,
			unique: true
		},
		inviteId: {
			type: mongoose.Schema.Types.String,
			required: true
		},
        ownerId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true
		}
	}
)

module.exports = mongoose.models.channels || mongoose.model('channels', ChannelSchema)