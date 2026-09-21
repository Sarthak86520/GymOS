import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {Trainer} from "../models/trainer.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
const getAllTrainers = asyncHandler(async (req, res) => {

    const trainers = await Trainer.find()
        .populate("user", "-password -refreshToken");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                trainers,
                "Trainers fetched successfully"
            )
        );
});

export {
    getAllTrainers
};