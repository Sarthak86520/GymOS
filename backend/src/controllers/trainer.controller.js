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

const getTrainerById = asyncHandler(async(req,res)=>{

    const {trainerId} = req.params;

     const trainer = await Trainer.findById(trainerId)
            .populate("user", "-password -refreshToken");
    
        if (!trainer) {
            throw new ApiError(
                404,
                "Trainer not found"
            );
        }
})

const updateMyTrainerProfile = asyncHandler(async (req, res) => {
    console.log("role:",req.user?.role)

    if (req.user?.role !== "trainer") {
        throw new ApiError(
            403,
            "You are not a trainer"
        );
    }

    const {
        bio,
        experience,
        specialization,
        certifications,
        image
    } = req.body;

    const trainer = await Trainer.findOne({
        user: req.user._id
    });

    if (!trainer) {
        throw new ApiError(
            404,
            "Trainer profile not found"
        );
    }

    const updatedTrainer = await Trainer.findOneAndUpdate(
        {
            user: req.user._id
        },
        {
            $set: {
                bio,
                experience,
                specialization,
                certifications,
                image
            }
        },
        {
            new: true,
            runValidators: true
        }
    ).populate(
        "user",
        "-password -refreshToken"
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedTrainer,
                "Trainer profile updated successfully"
            )
        );
});

export {
    getAllTrainers,
    getTrainerById,
    updateMyTrainerProfile
};