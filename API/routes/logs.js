import express from "express";
const router = express.Router();
import catchAsync from "express-async-handler";
import { validateLog } from "../middlewares/validations.js"
import { isSuper } from "../middlewares/middleware.js"
import * as logs from "../controllers/logs.js";


router.route('/')
    .get(catchAsync(logs.All))
    .post(isSuper, validateLog, isSuper, catchAsync(logs.Create))

router.route("/:logID")
    .get(catchAsync(logs.View))
    .put(isSuper, validateLog, catchAsync(logs.Update))
    .delete(isSuper, catchAsync(logs.Delete))


export default router;