import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

import MembershipPlan from "../models/membershipPlan.model.js";

const createMembershipPlan = asyncHandler(async (req, res) => {

    // Check admin
    if (req.user?.role !== "admin") {
        throw new ApiError(
            403,
            "Only admin can create membership plans"
        );
    }

    const {
        name,
        duration,
        price,
        description,
        features
    } = req.body;

    if (!name || !duration || !price) {
        throw new ApiError(
            400,
            "Name, duration and price are required"
        );
    }

    const existingPlan = await MembershipPlan.findOne({
        name
    });

    if (existingPlan) {
        throw new ApiError(
            409,
            "Membership plan already exists"
        );
    }

    const membershipPlan = await MembershipPlan.create({
        name,
        duration,
        price,
        description,
        features
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                membershipPlan,
                "Membership plan created successfully"
            )
        );
});

export {
    createMembershipPlan
};