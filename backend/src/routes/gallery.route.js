import { Router } from "express";

import {
   createGallery,
   getAllGallery,
   getGalleryById,
   updateGallery,
   deleteGallery
} from "../controllers/gallery.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
    "/",
    verifyJWT,
    upload.single("image"),
    createGallery
);
router.get(
    "/",
    getAllGallery
);
router.get(
    "/:galleryId",
    getGalleryById
);
router.patch(
    "/:galleryId",
    verifyJWT,
    upload.single("image"),
    updateGallery
);
router.delete(
    "/:galleryId",
    verifyJWT,
    deleteGallery
);

export default router;