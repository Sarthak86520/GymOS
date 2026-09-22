import { Router } from "express";

import {
    createMembershipPlan
} from "../controllers/membershipPlan.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/",
    verifyJWT,
    createMembershipPlan
);

export default router;