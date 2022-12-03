import { isSpecV } from "../middlewares/middleware.js";
import User from "../../models/user.js";
import Log from "../../models/log.js";


export const All = async (req, res, next) => {
	const search = req.query.search || "";
	// date format: YYYY-MM-DD
	const today = new Date();
	const since = req.query.since || new Date(today.getFullYear(), today.getMonth(), 1);
	const till = req.query.till || new Date(today.getFullYear(), today.getMonth() + 1, 0);
	const sinceDate = new Date(`${since}`);
	const tillDate = new Date(`${till}`);
	let logs;
	// if accessLevel of the user isn't high enough, then user's own logs only
	if (!await isSpecV(req)) {
		logs = await Log
			.find({
				worker: { $eq: req.user._id },
				date: { $gte: sinceDate, $lte: tillDate }
			})
			.select("_id date isAbsence startingTime finishingTime OTV payment extraNotes worker")
			.sort({ date: -1 })
			.populate("worker", "name")
	}
	else {
		logs = await Log
			.aggregate([
				{
					$lookup: {
						from: "users",
						localField: "worker",
						foreignField: "_id",
						as: "worker"
					}
				},
				{
					$match: {
						"date": { $gte: sinceDate, $lte: tillDate },
						"worker.name": { $regex: search, $options: "i" },
					}
				},
				{
					$project: { _id: 1, date: 1, isAbsence: 1, startingTime: 1, finishingTime: 1, OTV: 1, payment: 1, extraNotes: 1, "worker.name": 1, "worker._id": 1 }
				},
				{
					$unwind: '$worker'
				}
			])
			.sort({ date: -1 })
	}

	const _id = logs.map(({ _id }) => _id)
	let sum = await Log.aggregate([
		{
			$match: {
				_id: { "$in": _id }
			}
		},
		{
			$group: {
				_id: null, paymentsSum: { $sum: "$payment" }
			}
		}
	])

	if (sum.length < 1) {
		sum = [{ paymentsSum: 0 }];
		sum = [{ OTVSum: 0 }];
	}

	let count = await Log.aggregate([
		{
			$match: {
				_id: { "$in": _id },
				isAbsence: false
			}
		},
		{
			$group: {
				_id: null, "count": { "$sum": 1 }, OTVSum: { $sum: "$OTV" }
			}
		}
	])

	if (count.length < 1) {
		count = [{ count: 0 }];
	}

	return res
		.status(200)
		.json({
			logs: logs,
			paymentsSum: sum[0].paymentsSum,
			OTVSum: count[0].OTVSum,
			count: count[0].count
		})

}

export const Create = async (req, res, next) => {
	// Log is expected to be received as an Object called log
	const { log } = req.body;
	const worker = await User.findById(log.worker);
	const newLog = new Log(log)
	await newLog.save();
	worker.logs.push(newLog._id)
	try {
		worker.save();
		return res
			.status(201)
			.json({
				message: "Log Added Successfully"
			});
	} catch (error) {
		return res
			.status(409)
			.json({
				message: "Duplicate Key"
			})
	}
}

export const View = async (req, res, next) => {
	const { logID } = req.params;
	const log = await Log
		.findById(logID)
		.select("_id date isAbsence startingTime finishingTime OTV payment extraNotes worker")
		.populate("worker", "name")
	if (!log) {
		return res.status(404).json({
			message: "Cannot find that log!"
		});
	}
	// if user isn't Super (or Admin) and is trying to access someone else's logs 
	if (!await isSpecV(req) && !log.worker.equals(req.user._id)) {
		return res
			.status(401)
			.json({
				message: "You do not have permission to access this!",
			});
	}

	return res
		.status(200)
		.json({
			log: log
		});
}


export const Update = async (req, res, next) => {
	// Log is expected to be received as an Object called log
	const { logID } = req.params;
	const log = await Log.findByIdAndUpdate(logID, { ...req.body.log }, { new: true, runValidators: true })
	if (!log) {
		return res
			.status(404)
			.json({
				message: "Cannot find that log!"
			});
	}
	return res
		.status(201)
		.json({
			message: "Log Updated Successfully"
		});
}

export const Delete = async (req, res, next) => {
	const { logID } = req.params;
	const log = await Log.findByIdAndDelete(logID)
	if (!log) {
		return res
			.status(404)
			.json({
				message: "Cannot find that log!"
			});
	}
	return res
		.status(200)
		.json({
			message: "Log Deleted Successfully"
		});
}
