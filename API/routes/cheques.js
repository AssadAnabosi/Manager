import express from "express";
const router = express.Router();
import catchAsync from "express-async-handler";
import { validateCheque } from "../middlewares/validations.js";
import { isSuper } from "../middlewares/middleware.js";
import * as cheques from "../controllers/cheques.js";


router.route("/")
    .get(catchAsync(cheques.All))
    .post(isSuper, validateCheque, catchAsync(cheques.Create))

router.route("/:chequeID")
    .get(catchAsync(cheques.View))
    .put(isSuper, validateCheque, catchAsync(cheques.Update))
    .delete(isSuper, catchAsync(cheques.Delete))


export default router;