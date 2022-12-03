import express from "express";
const router = express.Router();
import catchAsync from "express-async-handler";
import { validateBill } from "../middlewares/validations.js";
import { isSuper, isAdmin } from "../middlewares/middleware.js";
import * as bills from "../controllers/bills.js";

router.route('/')
    .get(catchAsync(bills.All))
    .post(isSuper, validateBill, catchAsync(bills.Create))

router.route("/delete")
    .delete(isAdmin, catchAsync(bills.DeleteMany))

router.route("/:id")
    .get(catchAsync(bills.View))
    .put(isSuper, validateBill, catchAsync(bills.Update))
    .delete(isSuper, catchAsync(bills.Delete))

export default router;