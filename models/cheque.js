import mongoose from "mongoose";
const { Schema } = mongoose;

const chequeSchema = new Schema({
	serial: {
		type: Number,
		unique: true,
		required: [true, "Cheque Serial-Number can't be blank..."]
	},
	dueDate: {
		type: Date,
		required: [true, "Cheque Due Date can't be blank..."]
	},
	value: {
		type: Number,
		min: 0,
		required: [true, "Cheque Value can't be blank..."]
	},
	description: {
		type: String,
		required: false
	},
	payee: {
		type: Schema.Types.ObjectId,
		ref: "Payee",
	},
	isCancelled: {
		type: Boolean,
		default: false
	},
	isDeleted: {
		type: Boolean,
		default: false
	}

})



const Cheque = mongoose.model("Cheque", chequeSchema);

export default Cheque;