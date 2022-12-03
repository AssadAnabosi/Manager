import User from "../../models/user.js";

export const isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.status(401).json({
			message: "You must be signed in first!"
		});
	}
	next();
}

export const isSpec = async (req, res, next) => {
	// accessLevel is higher than "User" middleware
	const user = await User.findById(req.user._id);
	if (user.accessLevel === "User") {
		return res.status(401).json({
			message: "You do not have permission to access this!"
		});
	}
	next();
}

export const isSpecV = async (req) => {
	// accessLevel is higher than "User" boolean
	const user = await User.findById(req.user._id);
	return user.accessLevel !== "User";
}

export const isSuper = async (req, res, next) => {
	// accessLevel is higher than "User" and "Spectator"
	const user = await User.findById(req.user._id);
	if (user.accessLevel === "User" || user.accessLevel === "Spectator") {
		return res.status(401).json({
			message: "You do not have permission to access this!"
		});
	}
	next();
}

export const isAdmin = async (req, res, next) => {
	// accessLevel is "Administrator"
	const user = await User.findById(req.user._id);
	if (user.accessLevel !== "Administrator") {
		return res.status(401).json({
			message: "You do not have permission to access this!"
		});
	}
	next();
}