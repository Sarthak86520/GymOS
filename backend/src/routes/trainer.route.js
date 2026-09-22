import { Router } from "express";

import {
    getAllTrainers,
    getTrainerById,
    updateMyTrainerProfile,
    getMyTrainerProfile,
    getMyMembers,
    getMemberById
} from "../controllers/trainer.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { get } from "mongoose";


const router = Router();

router.get("/", getAllTrainers);
router.get("/:trainerId",getTrainerById)
router.patch("/me/profile",verifyJWT,updateMyTrainerProfile)
router.get("/me/profile",verifyJWT,getMyTrainerProfile)
router.get("/me/members",verifyJWT,getMyMembers) 
router.get(
    "/me/members/:memberId",
    verifyJWT,
    getMemberById
);


export default router;