import Bill from "../../models/bill.js";

export const All = async (req, res) => {
	// Read Queries
	const search = req.query.search || "";

	// date format: YYYY-MM-DD
	const today = new Date();
	const since = req.query.since || new Date(today.getFullYear(), today.getMonth(), 1);
	const till = req.query.till || new Date(today.getFullYear(), today.getMonth() + 1, 0);

	// just in case date arrives as a string not as an IOS format:
	const sinceDate = new Date(`${since}`)
	const tillDate = new Date(`${till}`)

	const bills = await Bill
		.find({
			date: { $gte: sinceDate, $lte: tillDate },
			$or: [
				{ description: { $regex: search, $options: "i" } },
				{ extraNotes: { $regex: search, $options: "i" } },
			]
		})
		.select("_id date value description extraNotes")
		.sort({ date: -1 })

	const _id = bills.map(({ _id }) => _id)
	let sum = await Bill.aggregate([
		{
			$match: {
				_id: { "$in": _id }
			}
		},
		{
			$group: {
				_id: null, total: { $sum: "$value" }
			}
		}
	])
	if (sum.length < 1) {
		sum = [{ total: 0 }];
	}

	let sumAllTime = await Bill.aggregate([
		{
			$group: {
				_id: null, total: { $sum: "$value" }
			}
		}
	])
	if (sumAllTime.length < 1) {
		sumAllTime = [{ total: 0 }];
	}
	return res
		.status(200)
		.json({
			bills: bills,
			sum: sum[0].total,
			sumAllTime: sumAllTime[0].total
		});
}

export const Create = async (req, res, next) => {
	// Bill is expected to be received as an Object called bill
	const { bill } = req.body;
	const newBill = new Bill(bill)
	try {
		await newBill.save();
		return res
			.status(201)
			.json({
				message: "Bill Added Successfully",
				bill: newBill
			});
	} catch (error) {
		return res
			.status(409)
			.json({
				message: error.message
			})
	}
}

export const View = async (req, res, next) => {
	const { id } = req.params
	const bill = await Bill
		.findById(id)
		.select("_id date value description extraNotes")
	if (!bill) {
		return res
			.status(404)
			.json({
				message: "Cannot find that bill!"
			});
	}
	return res
		.status(200)
		.json({
			bill: bill
		});
}


export const Update = async (req, res, next) => {
	// Bill is expected to be received as an Object called bill
	const { id } = req.params;
	const bill = await Bill.findByIdAndUpdate(id, { ...req.body.bill }, { new: true, runValidators: true })
	if (!bill) {
		return res
			.status(404)
			.json({
				message: "Cannot find that bill!"
			});
	}
	return res
		.status(201)
		.json({
			message: "Bill updated successfully!"
		});
}

export const Delete = async (req, res, next) => {
	const { id } = req.params;
	const bill = await Bill.findByIdAndDelete(id)
	if (!bill) {
		return res
			.status(404)
			.json({
				message: "Cannot find that bill!"
			});
	}
	return res
		.status(200)
		.json({
			message: "Bill Deleted Successfully"
		});
}

export const DeleteMany = async (req, res, next) => {
	const since = req.query.since;
	const till = req.query.till;
	if (since.length === 0 || till.length === 0) {
		return res
			.status(409)
			.json({
				message: "Start and End point are required for this operation!"
			});
	}
	const sinceDate = new Date(`${since}`);
	const tillDate = new Date(`${till}`);
	const result = await Bill.deleteMany({
		date: { $gte: sinceDate, $lte: tillDate },
	})

	return res
		.status(200)
		.json({
			message: result
		})
}