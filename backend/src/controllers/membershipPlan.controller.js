import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

import {MembershipPlan} from "../models/membershipplan.model.js";

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

const getAllMembershipPlans = asyncHandler(async (req, res) => {

    const plans = await MembershipPlan.find({
        isActive: true
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                plans,
                "Membership plans fetched successfully"
            )
        );
});

const getMembershipPlanById = asyncHandler(async (req, res) => {

    const { planId } = req.params;

    const plan = await MembershipPlan.findById(planId);

    if (!plan) {
        throw new ApiError(
            404,
            "Membership plan not found"
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                plan,
                "Membership plan fetched successfully"
            )
        );
});

const updateMembershipPlan = asyncHandler(async (req, res) => {

    if (req.user?.role !== "admin") {
        throw new ApiError(
            403,
            "Only admin can update membership plans"
        );
    }

    const { planId } = req.params;

    const {
        name,
        duration,
        price,
        description,
        features,
        isActive
    } = req.body;

    const plan = await MembershipPlan.findById(planId);

    if (!plan) {
        throw new ApiError(
            404,
            "Membership plan not found"
        );
    }

    const updatedPlan = await MembershipPlan.findByIdAndUpdate(
        planId,
        {
            $set: {
                name,
                duration,
                price,
                description,
                features,
                isActive
            }
        },
        {
            new: true,
            runValidators: true
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedPlan,
                "Membership plan updated successfully"
            )
        );
});

const deleteMembershipPlan = asyncHandler(async (req, res) => {

    if (req.user?.role !== "admin") {
        throw new ApiError(
            403,
            "Only admin can delete membership plans"
        );
    }

    const { planId } = req.params;

    const plan = await MembershipPlan.findById(planId);

    if (!plan) {
        throw new ApiError(
            404,
            "Membership plan not found"
        );
    }

    const deletedPlan = await MembershipPlan.findByIdAndUpdate(
        planId,
        {
            $set: {
                isActive: false
            }
        },
        {
            returnDocument: 'after'
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                deletedPlan,
                "Membership plan deactivated successfully"
            )
        );
});

export {
    createMembershipPlan,
    getAllMembershipPlans,
    getMembershipPlanById,
    updateMembershipPlan,
    deleteMembershipPlan
};