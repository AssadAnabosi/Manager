import mongoose from "mongoose";
const { Schema } = mongoose;

const logSchema = new Schema({
	date: {
		type: Date,
		required: [true, "Date can't be blank..."]
	},
	isAbsence: {
		type: Boolean,
		default: false
	},
	startingTime: {
		type: String,
		required: false,
	},
	finishingTime:{
		type: String,
		required: false,
	},
	OTV: {
		type: Number,
		required: false
	},
	payment: {
		type: Number,
		default: 0,
		required: false
	},
	extraNotes: {
		type: String,
		required: false
	},
	worker: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "You must specify a worker..."],
	}
})

//	Date-Worker Composite Unique Value
logSchema.index({ date: 1, worker: 1 }, { unique: true });

const Log = mongoose.model("Log", logSchema);


export default Log;