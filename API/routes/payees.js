import express from "express";
const router = express.Router();
import catchAsync from "express-async-handler";
import { validatePayee } from "../middlewares/validations.js";
import { isSuper } from "../middlewares/middleware.js";
import * as payees from "../controllers/payees.js";

router.route('/')
    .get(catchAsync(payees.All))
    .post(isSuper, validatePayee, catchAsync(payees.Create))

router.route("/:payeeID")
    .get(catchAsync(payees.View))
    .put(isSuper, validatePayee, catchAsync(payees.Update))
    .delete(isSuper, catchAsync(payees.Delete))


export default router;