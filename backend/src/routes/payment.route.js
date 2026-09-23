import { Router } from "express";

import {
   createRazorpayOrder,
   verifyRazorpayPayment
} from "../controllers/payment.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.post(
    "/create-order",
    verifyJWT,
    createRazorpayOrder
);
router.post(
    "/verify",
    verifyJWT,
    verifyRazorpayPayment
);

export default router