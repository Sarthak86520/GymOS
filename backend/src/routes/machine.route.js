import { Router } from "express";

import {
    createMachine,
    getAllMachines,
    getMachineById,
    updateMachine,
    deleteMachine
} from "../controllers/machine.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/",
    verifyJWT,
    createMachine
);
router.get(
    "/",
    getAllMachines
);
router.get(
    "/:machineId",
    getMachineById
);
router.patch(
    "/:machineId",
    verifyJWT,
    updateMachine
);
router.delete(
    "/:machineId",
    verifyJWT,
    deleteMachine
);
export default router;