import User from "../../models/user.js";
import Log from "../../models/log.js";


export const All = async (req, res, next) => {
	const search = req.query.search || "";
	const workers = await User
		.find({
			name: { $regex: search, $options: "i" }
		})
		.select("_id username name email phoneNumber accessLevel")
	return res
		.status(200)
		.json({
			workers: workers,
		});
}


export const View = async (req, res, next) => {
	const { id } = req.params;

	// date format: YYYY-MM-DD
	// const today = new Date();
	// const since = req.query.since || new Date(today.getFullYear(), today.getMonth(), 1);
	// const till = req.query.till || new Date(today.getFullYear(), today.getMonth() + 1, 0);
	// const sinceDate = new Date(`${since}`);
	// const tillDate = new Date(`${till}`);
	// Make sure that the access level User can only access his own data
	// if (req.user.accessLevel === "User" && req.user._id.toString() !== id) {
	// 	return res
	// 		.status(401)
	// 		.json({
	// 			message: "You do not have permission to access this!"
	// 		})
	// }

	const worker = await User
		.findById(id)
		.select("_id username name email phoneNumber accessLevel")
	if (!worker) {
		return res.status(404).json({
			message: "Cannot find that worker!"
		});
	}

	// sending back workers's logs and their sums/counts
	// const logs = await Log
	// 	.find({
	// 		worker: id,
	// 		date: { $gte: sinceDate, $lte: tillDate }
	// 	})
	// 	.select("_id date isAbsence startingTime finishingTime OTV payment extraNotes")

	// const _id = logs.map(({ _id }) => _id)
	// let sum = await Log.aggregate([
	// 	{
	// 		$match: {
	// 			_id: { "$in": _id }
	// 		}
	// 	},
	// 	{
	// 		$group: {
	// 			_id: null, paymentsSum: { $sum: "$payment" }, OTVSum: { $sum: "$OTV" }
	// 		}
	// 	}
	// ])
	// if (sum.length < 1) {
	// 	sum = [{ paymentsSum: 0 }];
	// 	sum = [{ OTVSum: 0 }];
	// }
	
	return res
		.status(200)
		.json({
			worker: worker,
			// logs: logs,
			// paymentsSum: sum[0].paymentsSum,
			// OTVSum: sum[0].OTVSum
		});
}

export const Update = async (req, res, next) => {
	// User data are not expected to be received as one object!
	const { id } = req.params;
	const worker = await User.findByIdAndUpdate(id, { name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber }, { new: true, runValidators: true })
	if (!worker) {
		return res
			.status(404)
			.json({
				message: "Cannot find that worker!"
			});
	}
	return res
		.status(201)
		.json({
			message: "Worker Updated Successfully",
		});
}

export const Delete = async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findByIdAndDelete(id)
	if (!user) {
		return res
			.status(404)
			.json({
				message: "Cannot find that worker!"
			});
	}
	return res
		.status(200)
		.json({
			message: "Worker Deleted Successfully",
		});
}
