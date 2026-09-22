import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

import Machine from "../models/machine.model.js";

const createMachine = asyncHandler(async (req, res) => {

    // Check admin
    if (req.user?.role !== "admin") {
        throw new ApiError(
            403,
            "Only admin can create machines"
        );
    }

    const {
        name,
        description,
        muscleGroup,
        quantity,
        image
    } = req.body;

    if (!name || !quantity) {
        throw new ApiError(
            400,
            "Name and quantity are required"
        );
    }

    const machine = await Machine.create({
        name,
        description,
        muscleGroup,
        quantity,
        image
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                machine,
                "Machine created successfully"
            )
        );
});

const getAllMachines = asyncHandler(async (req, res) => {

    const machines = await Machine.find();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                machines,
                "Machines fetched successfully"
            )
        );
});

const getMachineById = asyncHandler(async (req, res) => {

    const { machineId } = req.params;

    const machine = await Machine.findById(machineId);

    if (!machine) {
        throw new ApiError(
            404,
            "Machine not found"
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                machine,
                "Machine fetched successfully"
            )
        );
});

const updateMachine = asyncHandler(async (req, res) => {
    if (req.user?.role !== "admin") {
        throw new ApiError(
            403,
            "Only admin can update machines"
        );
    }

    const { machineId } = req.params;

    const {
        name,
        description,
        muscleGroup,
        quantity,
        image,
        isAvailable
    } = req.body;

    const machine = await Machine.findById(machineId);

    if (!machine) {
        throw new ApiError(404, "Machine not found");
    }

    const updatedMachine = await Machine.findByIdAndUpdate(
        machineId,
        {
            $set: {
                name,
                description,
                muscleGroup,
                quantity,
                image,
                isAvailable
            }
        },
        {
            new: true,
            runValidators: true
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedMachine,
            "Machine updated successfully"
        )
    );
});

const deleteMachine = asyncHandler(async (req, res) => {
    if (req.user?.role !== "admin") {
        throw new ApiError(
            403,
            "Only admin can delete machines"
        );
    }

    const { machineId } = req.params;

    const machine = await Machine.findById(machineId);

    if (!machine) {
        throw new ApiError(404, "Machine not found");
    }

    const deletedMachine = await Machine.findByIdAndDelete(machineId);

    return res.status(200).json(
        new ApiResponse(
            200,
            deletedMachine,
            "Machine deleted successfully"
        )
    );
});

export {
    createMachine,
    getAllMachines,
    getMachineById,
    updateMachine,
    deleteMachine
};