import { Router } from "express";

import {
    getAllTrainers,
    getTrainerById,
    updateMyTrainerProfile
} from "../controllers/trainer.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { get } from "mongoose";


const router = Router();

router.get("/", getAllTrainers);
router.get("/:trainerId",getTrainerById)
router.get("/me/profile",verifyJWT,updateMyTrainerProfile)

export default router;