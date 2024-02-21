import mongoose from 'mongoose'
// The schema ensures that the inputs match the data types and is inputted
const ParticipantSchema = new mongoose.Schema(
	{
		channelId: { // Id of channel
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		userId: { // userId of participant
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		}
	}
)

module.exports = mongoose.models.participants || mongoose.model('participants', ParticipantSchema)