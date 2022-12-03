import express from "express";
const router = express.Router();
import catchAsync from "express-async-handler";
import { validateUser } from "../middlewares/validations.js";
import { isSpec, isSuper, isAdmin } from "../middlewares/middleware.js";
import * as workers from "../controllers/workers.js";

//  Index - GET
router.get('/', isSpec, catchAsync(workers.All))

router.route("/:id")
    .get(catchAsync(workers.View))
    .put(isSuper, validateUser, catchAsync(workers.Update))
    .delete(isAdmin, catchAsync(workers.Delete))


export default router;