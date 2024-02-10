import mongoose from 'mongoose'
// The schema ensures that the inputs match the data types and is inputted
const EmployeeSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true
		},
		permissionLevel: {
			type: mongoose.Schema.Types.Number,
			required: true
		}
	}
)

module.exports = mongoose.models.employees || mongoose.model('employees', EmployeeSchema)