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

export {
    promoteMemberToTrainer
};