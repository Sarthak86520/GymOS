import { Router } from "express";

import {
    createMembershipPlan,
    getAllMembershipPlans,
    getMembershipPlanById,
    updateMembershipPlan,
    deleteMembershipPlan
} from "../controllers/membershipPlan.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/",
    verifyJWT,
    createMembershipPlan
);
router.get(
    "/",
    getAllMembershipPlans
);
router.get(
    "/:planId",
    getMembershipPlanById
);
router.patch(
    "/:planId",
    verifyJWT,
    updateMembershipPlan
);
router.delete(
    "/:planId",
    verifyJWT,
    deleteMembershipPlan
);

export default router;