import { Router } from "express";

import {
    promoteMemberToTrainer,
    assignMemberToTrainer,
    removeMemberFromTrainer
} from "../controllers/admin.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.patch(
    "/:memberId/promote-trainer",
    verifyJWT,
    promoteMemberToTrainer
);
router.patch(
    "/:memberId/trainers/:trainerId",
    verifyJWT,
    assignMemberToTrainer
);
router.delete(
    "/members/:memberId/trainers/:trainerId",
    verifyJWT,
    removeMemberFromTrainer
);
export default router;