import User from "../../models/user.js";

export const Create = async (req, res, next) => {
    // User data are not expected to be received as one object!
    try {
        let { name, email, phoneNumber, username, password } = req.body;
        const user = new User({ name, email, phoneNumber, username });
        await User.register(user, password);
        return res
            .status(201)
            .json({
                message: "Worker created successfully"
            });
    } catch (error) {
        return res
            .status(409)
            .json({
                message: error.message
            });
    }
}

export const CheckUsername = async (req, res, next) => {
    const { username } = req.body;
    const user = await User.findByUsername(username);
    if (!user) {
        return res
            .status(200)
            .json({
                available: true,
                message: ""
            });
    }
    return res
        .status(400)
        .json({
            available: false,
            message: "Username already taken"
        });
}

export const CheckAuthentication = (req, res) => {
    return req.isAuthenticated() ?
        SuccessLogin(req, res) : FailedLogin(req, res);
}


export const getMe = (req, res) => {
    if (req.isAuthenticated()) {
        const user = {};
        user.name = req.user.name;
        user.username = req.user.username;
        user.phoneNumber = req.user.phoneNumber;
        user.email = req.user.email;
        user.accessLevel = req.user.accessLevel;
        user._id = req.user._id;
        return res
            .status(200)
            .json({
                cookies: req.cookies,
                user
            })
    } else {
        return res
            .status(200)
            .json({
                cookies: req.cookies,
                user: null
            })
    }
}

export const SuccessLogin = (req, res) => {
    const user = {};
    user.name = req.user.name;
    user.username = req.user.username;
    user.phoneNumber = req.user.phoneNumber;
    user.email = req.user.email;
    user.accessLevel = req.user.accessLevel;
    return res
        .status(200)
        .json({
            success: true,
            message: "Welcome Back!",
            cookies: req.cookies,
            user
        });
}


export const FailedLogin = (req, res) => {
    return res
        .status(200)
        .json({
            success: false,
            message: "Invalid login credentials",
            cookies: req.cookies,
            user: null
        });
}

export const Logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return res.redirect("/500")
        }
        return res
            .status(200)
            .json({
                message: "Good Bye!",
                user: null
            });
    });
}


export const PasswordChange = async (req, res, next) => {
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) {
            return res
                .status(500)
                .json({
                    message: err.message
                })
        } else {
            user.changePassword(req.body.oldPassword, req.body.password, function (err) {
                if (err) {
                    if (err.name === "IncorrectPasswordError") {
                        return res
                            .status(401)
                            .json({
                                message: "Incorrect Password"
                            })
                    } else {
                        console.log(err.name)
                        return res
                            .status(500)
                            .json({
                                message: "Something went wrong!! Please try again after sometimes."
                            })
                    }
                } else {
                    return res
                        .status(201)
                        .json({
                            message: "Password Changed Successfully"
                        })
                }
            })
        }

    });
}

export const PasswordSet = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
        return res
            .status(404)
            .json({
                message: "User Not Found"
            });
    }
    try {
        await user.setPassword(req.body.password);
        await user.save();
        return res
            .status(201)
            .json({
                message: "Password Changed Successfully"
            })
    } catch (err) {
        return res
            .status(500)
            .json({
                message: err.message
            })
    }
}

export const UpdatePermissions = async (req, res, next) => {
    const { id } = req.params;
    const { permission } = req.body;
    const worker = await User.findByIdAndUpdate(id, {
        accessLevel: permission,
    },
        { new: true, runValidators: true }
    )
    if (!worker) {
        return res
            .status(404)
            .json({
                message: "Cannot find that worker!",
            })
    }
    return res
        .status(201)
        .json({
            message: "Permissions Updated Successfully"
        });
}
