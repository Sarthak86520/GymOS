import { Router } from "express";


import {
    getMyMembership,
    getMembershipHistory,
    getMembershipById
} from "../controllers/membership.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
    "/me",
    verifyJWT,
    getMyMembership
);
router.get(
    "/me/history",
    verifyJWT,
    getMembershipHistory
);
router.get(
    "/:membershipId",
    verifyJWT,
    getMembershipById
);

export default router;