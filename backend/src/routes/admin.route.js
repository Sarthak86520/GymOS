import { Router } from "express";

import {
    promoteMemberToTrainer
} from "../controllers/admin.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.patch(
    "/:memberId/promote-trainer",
    verifyJWT,
    promoteMemberToTrainer
);

export default router;