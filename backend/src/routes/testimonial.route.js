import { Router } from "express";

import {
    createTestimonial,
    getAllTestimonials,
    getTestimonialById,
    updateMyTestimonial,
    deleteMyTestimonial
} from "../controllers/testimonial.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"


const router = Router();

router.post(
    "/",
    verifyJWT,
    upload.single("image"),
    createTestimonial
);

router.get(
    "/",
    getAllTestimonials
);

router.get(
    "/:testimonialId",
    getTestimonialById
);

router.patch(
    "/:testimonialId",
    verifyJWT,
    upload.single("image"),
    updateMyTestimonial
);

router.delete(
    "/:testimonialId",
    verifyJWT,
    deleteMyTestimonial
);

export default router;