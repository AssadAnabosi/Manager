import mongoose from "mongoose";
import Cheque from "./cheque.js";
const { Schema } = mongoose;

const payeeSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name can't be blank..."],
		unique: true,
	},
	email: {
		type: String,
		required: false
	},
	phoneNumber: {
		type: String,
		required: false
	},
	extraNotes: {
		type: String,
		required: false
	},
	cheques: [
		{
			type: Schema.Types.ObjectId,
			ref: "Cheque"
		}
	]
})

payeeSchema.post("findOneAndDelete", async function (payee) {
	if (payee.cheques.length) {
		await Cheque.updateMany({ _id: { $in: payee.cheques } }, { isDeleted: true, payee: null })
	}
})

const Payee = mongoose.model("Payee", payeeSchema);

export default Payee;