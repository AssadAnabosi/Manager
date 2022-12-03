import express from "express";
const router = express.Router();
import catchAsync from "express-async-handler";
import passport from "passport";
import * as users from "../controllers/users.js";
import { isLoggedIn, isSuper, isAdmin } from "../middlewares/middleware.js";

router.route("/checkUsername")
    .post(isLoggedIn, isSuper, catchAsync(users.CheckUsername))

router.route("/register")
    .post(isLoggedIn, isSuper, catchAsync(users.Create))

router.route("/login")
    .post(passport.authenticate('local', {
        failureRedirect: "/api/login/failed",
    }), users.SuccessLogin);

router.route("/login/failed")
    .get(users.FailedLogin);

router.route("/user")
    .get(users.getMe)

router.route("/logout")
    .get(isLoggedIn, users.Logout)

router.route("/changePassword")
    .patch(isLoggedIn, catchAsync(users.PasswordChange))

router.patch("/changePassword/:id", isLoggedIn, isAdmin, catchAsync(users.PasswordSet))

router.patch("/updatePermissions/:id", isLoggedIn, isAdmin, catchAsync(users.UpdatePermissions))

export default router;