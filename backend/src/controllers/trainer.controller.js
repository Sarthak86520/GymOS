import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {Trainer} from "../models/trainer.model.js"
import {Member} from "../models/member.model.js"
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

const getMyTrainerProfile = asyncHandler(async (req, res) => {

    if (req.user?.role !== "trainer") {
        throw new ApiError(
            403,
            "You are not a trainer"
        );
    }

    const trainer = await Trainer.findOne({
        user: req.user._id
    }).populate(
        "user",
        "-password -refreshToken"
    );

    if (!trainer) {
        throw new ApiError(
            404,
            "Trainer profile not found"
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                trainer,
                "Trainer profile fetched successfully"
            )
        );
});

const getMyMembers = asyncHandler(async (req, res) => {

    if (req.user?.role !== "trainer") {
        throw new ApiError(
            403,
            "You are not a trainer"
        );
    }

    const trainer = await Trainer.findOne({
        user: req.user._id
    });

    if (!trainer) {
        throw new ApiError(
            404,
            "Trainer profile not found"
        );
    }

    const members = await Member.find({
        trainer: trainer._id
    }).populate(
        "user",
        "-password -refreshToken"
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                members,
                "Assigned members fetched successfully"
            )
        );
});

const getMemberById = asyncHandler(async (req, res) => {

    // Check trainer
    if (req.user?.role !== "trainer") {
        throw new ApiError(
            403,
            "You are not a trainer"
        );
    }

    const { memberId } = req.params;

    // Find trainer profile
    const trainer = await Trainer.findOne({
        user: req.user._id
    });

    if (!trainer) {
        throw new ApiError(
            404,
            "Trainer profile not found"
        );
    }

    // Find member assigned to this trainer
    const member = await Member.findOne({
        _id: memberId,
        trainer: trainer._id
    }).populate(
        "user",
        "-password -refreshToken"
    );

    if (!member) {
        throw new ApiError(
            404,
            "Member not found or not assigned to you"
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                member,
                "Member fetched successfully"
            )
        );
});

export {
    getAllTrainers,
    getTrainerById,
    updateMyTrainerProfile,
    getMyTrainerProfile,
    getMyMembers,
    getMemberById
};