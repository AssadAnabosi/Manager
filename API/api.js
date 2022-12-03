import express from "express"
import { isLoggedIn, isSpec } from "./middlewares/middleware.js";
const router = express.Router();

// Routes and Authorizations
import billsRoutes from "./routes/bills.js";
import workersRoutes from "./routes/workers.js";
import logsRoutes from "./routes/logs.js";
import payeesRoutes from "./routes/payees.js";
import chequesRoutes from "./routes/cheques.js";
import usersRoutes from "./routes/users.js";

//	Routes
router.use("/bills",isLoggedIn, isSpec, billsRoutes);
router.use("/payees",isLoggedIn, isSpec, payeesRoutes);
router.use("/workers",isLoggedIn, workersRoutes);
router.use("/logs",isLoggedIn, logsRoutes)
router.use("/cheques",isLoggedIn, isSpec, chequesRoutes);
router.use("/", usersRoutes);
router.route("*")
    .all((req, res)=>{
        return res.status(404).json({
            message: "This page doesn't exist!"
        });
    })


export default router;