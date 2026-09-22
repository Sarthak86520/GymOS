import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

import {User} from "../models/user.model.js";
import {Member} from "../models/member.model.js";
import {Trainer} from "../models/trainer.model.js";

const promoteMemberToTrainer = asyncHandler(async (req, res) => {

    // Check if logged-in user is admin
    if (req.user?.role !== "admin") {
        throw new ApiError(
            403,
            "Only admin can promote a member to trainer"
        );
    }

    const { memberId } = req.params;

    // Find member
    const member = await Member.findById(memberId);

    if (!member) {
        throw new ApiError(
            404,
            "Member not found"
        );
    }

    // Find the User connected to this member
    const user = await User.findById(member.user);

    if (!user) {
        throw new ApiError(
            404,
            "User associated with this member not found"
        );
    }

    // Check if already trainer
    if (user.role === "trainer") {
        throw new ApiError(
            409,
            "User is already a trainer"
        );
    }

    // Change role
    user.role = "trainer";
    await user.save();

    // Create trainer profile
    const trainer = await Trainer.create({
        user: user._id
    });

    const promotedTrainer = await Trainer.findById(trainer._id)
        .populate("user", "-password -refreshToken");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                promotedTrainer,
                "Member promoted to trainer successfully"
            )
        );
});

const assignMemberToTrainer = asyncHandler(async (req, res) => {

    // Check admin
    if (req.user?.role !== "admin") {
        throw new ApiError(
            403,
            "Only admin can assign members to trainers"
        );
    }

    const { memberId, trainerId } = req.params;

    // Check member
    const member = await Member.findById(memberId);

    if (!member) {
        throw new ApiError(
            404,
            "Member not found"
        );
    }

    // Check trainer
    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
        throw new ApiError(
            404,
            "Trainer not found"
        );
    }

    // Assign trainer
    const updatedMember = await Member.findByIdAndUpdate(
        memberId,
        {
            $set: {
                trainer: trainerId
            }
        },
        {
            new: true,
            runValidators: true
        }
    )
        .populate(
            "user",
            "-password -refreshToken"
        )
        .populate("trainer");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedMember,
                "Member assigned to trainer successfully"
            )
        );
}
)
const removeMemberFromTrainer = asyncHandler(async (req, res) => {

    // Check admin
    if (req.user?.role !== "admin") {
        throw new ApiError(
            403,
            "Only admin can remove a member from a trainer"
        );
    }

    const { memberId, trainerId } = req.params;

    // Check member
    const member = await Member.findById(memberId);

    if (!member) {
        throw new ApiError(
            404,
            "Member not found"
        );
    }

    // Check trainer
    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
        throw new ApiError(
            404,
            "Trainer not found"
        );
    }

    // Check whether member is assigned to this trainer
    if (!member.trainer || member.trainer.toString() !== trainerId) {
        throw new ApiError(
            400,
            "This member is not assigned to this trainer"
        );
    }

    // Remove trainer
    const updatedMember = await Member.findByIdAndUpdate(
        memberId,
        {
            $set: {
                trainer: null
            }
        },
        {
            new: true,
            runValidators: true
        }
    )
        .populate(
            "user",
            "-password -refreshToken"
        )
        .populate("trainer");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedMember,
                "Member removed from trainer successfully"
            )
        );
});

export {
    promoteMemberToTrainer,
    assignMemberToTrainer,
    removeMemberFromTrainer
};