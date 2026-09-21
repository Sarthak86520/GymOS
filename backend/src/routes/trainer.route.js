import { Router } from "express";

import {
    getAllTrainers
} from "../controllers/trainer.controller.js";

const router = Router();

router.get("/", getAllTrainers);

export default router;