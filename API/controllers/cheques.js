import Payee from "../../models/payee.js";
import Cheque from "../../models/cheque.js";

export const All = async (req, res, next) => {
	const search = req.query.search || "";
	// date format: YYYY/MM/DD
	const today = new Date();
	const since = req.query.since || new Date(today.getFullYear(), today.getMonth(), 1);
	const till = req.query.till || new Date(today.getFullYear(), today.getMonth() + 1, 0);
	const sinceDate = new Date(`${since}`);
	const tillDate = new Date(`${till}`);
	const cheques = await Cheque
		.aggregate([
			{
				$lookup: {
					from: "payees",
					localField: "payee",
					foreignField: "_id",
					as: "payee"
				}
			},
			{
				$match: {
					$or: [
						{
							$and: [
								{ "dueDate": { $gte: sinceDate, $lte: tillDate } },
								{
									$or: [
										{ "payee.name": { $regex: search, $options: "i" } },
										{ "isDeleted": true },
										{ "isCancelled": true }
									]
								}

							]
						},
						{
							"serial": { $eq: parseInt(search) }
						}
					]
				}
			},
			{
				$project: { _id: 1, serial: 1, dueDate: 1, value: 1, description: 1, "payee.name": 1, "payee._id": 1, isCancelled: 1, isDeleted: 1 }
			},
		])
		.sort({ dueDate: -1, serial: 1 })
	const _id = cheques.map(({ _id }) => _id)
	let sum = await Cheque.aggregate([
		{
			$match:
			{
				_id: { "$in": _id },
				"isCancelled": false,
			}
		},
		{
			$group:
			{
				_id: null,
				total: { $sum: "$value" }
			}
		}
	])
	if (sum.length < 1) {
		sum = [{ total: 0 }];
	}

	return res
		.status(200)
		.json({
			cheques: cheques,
			sum: sum[0].total
		});
}

export const Create = async (req, res, next) => {
	// Cheque is expected to be received as an Object called cheque
	const { cheque } = req.body;
	const payeeID = cheque.payee;
	if (payeeID === "") {
		delete cheque.payee;
	}
	const newCheque = new Cheque(cheque)
	try {
		await newCheque.save();
		if (!cheque.isCancelled) {
			const payee = await Payee.findById(payeeID);
			payee.cheques.push(newCheque._id)
			payee.save();
		}
		return res
			.status(201)
			.json({
				message: "Cheque Added Successfully"
			});
	}
	catch (error) {
		console.log(error.message);
		return res
			.status(409)
			.json({
				message: error.message
			})
	}
}

export const View = async (req, res, next) => {
	const { chequeID } = req.params;
	const cheque = await Cheque
		.findById(chequeID)
		.select("_id serial dueDate value isCancelled payee isDeleted description")
		.populate("payee", "name")
	if (!cheque) {
		return res
			.status(404)
			.json({
				message: "Cannot find that cheque!"
			});
	}
	return res
		.status(200)
		.json({
			cheque: cheque
		});
}

export const Update = async (req, res, next) => {
	// Cheque is expected to be received as an Object called cheque
	const { chequeID } = req.params;
	req.body.cheque.isCancelled = !!req.body.cheque.isCancelled;
	const cheque = await Cheque.findById(chequeID);
	if (!cheque) {
		return res
			.status(404)
			.json({
				message: "Cannot find that cheque!"
			});
	}
	// Cheque Payee Deleted and req has payee  
	else if (cheque.isDeleted && req.body.cheque.payee.length != 0) {
		req.body.cheque.isDeleted = false;
	}
	// Cheque is Cancelled and req has Cancelation OR  ... IDR :'(
	if ((!cheque.isCancelled && req.body.cheque.isCancelled) || (cheque.isDeleted && req.body.cheque.payee.length == 0)) {
		delete req.body.cheque.payee;
	}
	// Cheque Deleted and req has Cancelation  
	if (cheque.isDeleted && req.body.cheque.isCancelled) {
		delete req.body.cheque.payee;
		req.body.cheque.isDeleted = false;
	}
	try {
		await Cheque
			.findByIdAndUpdate(chequeID, { ...req.body.cheque }, { new: true, runValidators: true })
		return res
			.status(201)
			.json({
				message: "Cheque updated successfully!"
			});
	} catch (error) {
		console.log(error.message);
		return res
			.status(409)
			.json({
				message: error.message
			})
	}
}

export const Delete = async (req, res, next) => {
	const { chequeID } = req.params;
	const cheque = await Cheque.findByIdAndDelete(chequeID)
	if (!cheque) {
		return res
			.status(404)
			.json({
				message: "Cannot find that cheque!"
			});
	}
	return res
		.status(200)
		.json({
			message: "Cheque Deleted Successfully"
		})
}
