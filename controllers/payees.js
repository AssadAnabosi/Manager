const Payee = require("../models/payee");

module.exports.all = async (req, res, next) => {
	const payees = await Payee.find({})
	res.render("payees/index", {
		pageTitle: "Manager - Payees",
		payees: payees
	})
}

module.exports.renderNewForm = (req, res) => {
	res.render("payees/new", {
		pageTitle: "Manager - Insert New Payee"
	})
}

module.exports.create = async (req, res, next) => {
	const payee = new Payee(req.body.payee)
	await payee.save();
	req.flash("success", "Payee Added Successfully");
	res.redirect("/payees")
}

module.exports.view = async (req, res, next) => {
	const { payeeID } = req.params;
	const payee = await Payee.findById(payeeID).populate("cheques")
	if (!payee) {
		req.flash("error", "Cannot find that payee!");
		return res.redirect("/payees");
	}
	res.render("payees/show", {
		pageTitle: "Manager - Payee",
		payee: payee
	})
}

module.exports.renderEditForm = async (req, res, next) => {
	const { payeeID } = req.params;
	const payee = await Payee.findById(payeeID)
	if (!payee) {
		req.flash("error", "Cannot find that payee!");
		return res.redirect("/payees");
	}
	res.render("payees/edit", {
		pageTitle: "Manager - Payee",
		payee: payee
	});
}

module.exports.update = async (req, res, next) => {
	const { payeeID } = req.params;
	const payee = await Payee.findByIdAndUpdate(payeeID, { ...req.body.payee }, { new: true, runValidators: true })
	if (!payee) {
		req.flash("error", "Cannot find that payee!");
		return res.redirect("/payees");
	}
	req.flash("success", "Payee Updated Successfully");
	res.redirect("/payees/" + payeeID)
}

module.exports.delete = async (req, res, next) => {
	const { payeeID } = req.params;
	const payee = await Payee.findByIdAndDelete(payeeID)
	if (!payee) {
		req.flash("error", "Cannot find that payee!");
		return res.redirect("/payees");
	}
	req.flash("success", "Payee Deleted Successfully");
	res.redirect("/payees")
}
