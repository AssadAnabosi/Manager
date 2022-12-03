import mongoose from "mongoose";
const { Schema } = mongoose;

const billSchema = new Schema({
	date: {
		type: Date,
		required: [true, "Date can't be blank..."]
	},
	value: {
		type: Number,
		required: [true, "Value can't be blank..."]
	},
	description: {
		type: String,
		required: [true, "Description can't be blank..."]
	},
	extraNotes: {
		type: String,
		required: false
	}
})
const Bill = mongoose.model("Bill", billSchema);

export default Bill;