import mongoose from 'mongoose'
// The schema ensures that the inputs match the data types and is inputted
const ChannelSchema = new mongoose.Schema(
	{
		name: { // Name of the group
			type: mongoose.Schema.Types.String,
			required: true,
		},
		inviteId: { // unqiue ID string which users can join with
			type: mongoose.Schema.Types.String,
			required: true,
			unqiue: true
		},
        ownerId: { // Id of user who created group.
			type: mongoose.Schema.Types.ObjectId,
			required: true
		}
	}
)

module.exports = mongoose.models.channels || mongoose.model('channels', ChannelSchema)