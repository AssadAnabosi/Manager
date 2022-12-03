// Setting up Env Vars

import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}
const PORT = process.env.PORT || 5000;
const CLIENT = `http://localhost:${PORT}`;
const MONGOD_PORT = process.env.DB_PORT || 27017;

const secret = process.env.SECRET || "whatawonderfullsecret!"
// const secure = process.env.SECURE_COOKIES === "true" || false;


import express from "express";
import mongoose from "mongoose";

//	Path
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//	Session
import session from "express-session";
import MongoStore from "connect-mongo";
//	Passport.js
import passport from "passport";
import LocalStrategy from "passport-local"
import mongoSanitize from "express-mongo-sanitize"

import helmet from "helmet";

import User from "./models/user.js";


// API
import cors from "cors";
import APIRoutes from "./API/api.js"

//	DB CONNECTION

const dbUrl = process.env.DB_URL || "mongodb://localhost:" + MONGOD_PORT + "/managerDB"
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => {
		console.log("Connection to the Database was established successfully!");
	})
	.catch(error => {
		console.log("An ERROR occurred while attempting to connect to the Database");
		console.log(error);
	})
mongoose.connection.once("open", async () => {
	if (await User.countDocuments().exec() < 1) {
		let email = process.env.ADMIN_EMAIL || "";
		let name = process.env.ADMIN_USERNAME || "admin"
		let password = process.env.ADMIN_PASSWORD || "admin";
		let phoneNumber = process.env.ADMIN_PHONE_NUMBER || "";
		let accessLevel = "Administrator";
		try {
			const user = new User({ name: name, email: email, phoneNumber: phoneNumber, accessLevel: accessLevel, username: name });
			await User.register(user, password);
			console.log("username: " + name)
			console.log("password: " + password)
		}
		catch (e) {
			console.log(e)
		}
	}
})

//	Session Configuration
const store = MongoStore.create({
	mongoUrl: dbUrl,
	touchAfter: 24 * 60 * 60,
	crypto: {
		secret
	}
});

const sessionConfig = {
	store,
	name: "managerSession",
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: false,
		expires: Date.now() + (1000 * 60 * 60 * 24),
		maxAge: (1000 * 60 * 60 * 24),
	}
}
//	
const app = express();

//	Parsing JSON
app.use(express.urlencoded({ extended: true }));
//	Configuring Session
app.use(session(sessionConfig));
//	Helmet
app.use(helmet());
//	Mongo Sanitize
app.use(mongoSanitize({
	replaceWith: '_'
}));

app.use(express.json());
app.use(cors({
	origin: CLIENT,
	methods: "GET,POST,PUT,PATCH,DELETE",
	credentials: true,
}));

//	Passport Session Manager
app.use(passport.initialize());
app.use(passport.session());

//	Passport Configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Configuring Helemt's Content Security Policy

const scriptSrcUrls = [
	"https://kit.fontawesome.com/8204973c77.js",
];
const styleSrcUrls = [
	"https://fonts.googleapis.com",
];
const connectSrcUrls = [
	"https://ka-f.fontawesome.com/"
];
const fontSrcUrls = [
	"https://fonts.googleapis.com",
	"https://fonts.gstatic.com",
];

const mediaSrcUrls = [

];
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: [],
			connectSrc: ["'self'", ...connectSrcUrls],
			scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
			styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
			workerSrc: ["'self'", "blob:"],
			childSrc: ["blob:"],
			objectSrc: [],
			mediaSrc: [
				"'self'", ...mediaSrcUrls],
			imgSrc: [
				"'self'",
				"blob:",
				"data:",
			],
			fontSrc: ["'self'", ...fontSrcUrls],
		},
	})
);


//	Main Middleware
app.use((req, res, next) => {
	//	Storing current user data
	res.locals.currentUser = req.user;
	next();
});

//	API
app.use("/api", APIRoutes)



// E R R O R
app.use((err, req, res, next) => {
	console.log("! ! ! E R R O R ! ! !");
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "Oh No, Something Went Wrong!"
	console.log(err);
	console.log(err.message);
	return res.status(statusCode).json({ error: err.message });
});

// Start Listening 
app.listen(PORT, () => {
	console.log(`Server has started on PORT: ${PORT}`);
})