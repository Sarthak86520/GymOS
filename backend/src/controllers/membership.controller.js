import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

import {User} from "../models/user.model.js";
import {Member} from "../models/member.model.js";
import { Membership } from "../models/membership.model.js";
import {Trainer} from "../models/trainer.model.js";

const getMyMembership = asyncHandler(async (req, res) => {
    const member = await Member.findOne({
        user: req.user._id
    });

    if (!member) {
        throw new ApiError(
            404,
            "Member profile not found"
        );
    }

    const now = new Date();

    const membership = await Membership.findOne({
        member: member._id,
        startDate: { $lte: now },
        endDate: { $gt: now }
    })
        .populate("plan")
        .sort({ endDate: -1 });

    if (!membership) {
        throw new ApiError(
            404,
            "No active membership found"
        );
    }

    const daysLeft = Math.ceil(
        (membership.endDate - now) /
        (1000 * 60 * 60 * 24)
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                membership,
                daysLeft,
                isActive: true
            },
            "Active membership fetched successfully"
        )
    );
});

const getMembershipHistory = asyncHandler(async (req, res) => {
    const member = await Member.findOne({
        user: req.user._id
    });

    if (!member) {
        throw new ApiError(
            404,
            "Member profile not found"
        );
    }

    const memberships = await Membership.find({
        member: member._id
    })
        .populate("plan")
        .sort({ startDate: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            memberships,
            "Membership history fetched successfully"
        )
    );
});

const getMembershipById = asyncHandler(async (req, res) => {
    const { membershipId } = req.params;

    const member = await Member.findOne({
        user: req.user._id
    });

    if (!member) {
        throw new ApiError(
            404,
            "Member profile not found"
        );
    }

    const membership = await Membership.findOne({
        _id: membershipId,
        member: member._id
    }).populate("plan");

    if (!membership) {
        throw new ApiError(
            404,
            "Membership not found"
        );
    }

    const now = new Date();

    const isActive =
        membership.startDate <= now &&
        membership.endDate > now;

    const daysLeft = isActive
        ? Math.ceil(
              (membership.endDate - now) /
              (1000 * 60 * 60 * 24)
          )
        : 0;

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                membership,
                isActive,
                daysLeft
            },
            "Membership fetched successfully"
        )
    );
});


export {
   getMyMembership,
   getMembershipHistory,
   getMembershipById

};