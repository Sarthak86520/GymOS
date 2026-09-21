import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {Member} from "../models/member.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const getMyProfile = asyncHandler(async(req,res)=>{
    console.log("REQ USER:", req.user);
    console.log("USER ID:", req.user?._id);
    const member = await Member.findOne({
        user:req.user?._id
    }).populate("user","-password -refreshToken")
    if (!member) {
        throw new ApiError(
            404,
            "Member profile not found"
        );
    }
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        member,
        "User fetched successfully"
    ))
})

const updateMyProfile = asyncHandler(async (req, res) => {

    const {
        phone,
        gender,
        dateOfBirth,
        address
    } = req.body;

    if (!phone || !gender || !dateOfBirth || !address) {
        throw new ApiError(
            400,
            "All fields are required"
        );
    }

    const member = await Member.findOne({
        user: req.user._id
    });

    if (!member) {
        throw new ApiError(
            404,
            "Member profile not found"
        );
    }

   const updatedMember = await Member.findOneAndUpdate(
    {
        user: req.user._id
    },
    {
        $set: {
            phone,
            gender,
            dateOfBirth,
            address
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
    if (!updatedMember) {
    throw new ApiError(
        404,
        "Member profile not found"
    );
}

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedMember,
                "Member details updated successfully"
            )
        );
});

const getAllMembers = asyncHandler(async (req, res) => {

    const members = await Member.find()
        .populate("user", "-password -refreshToken")
        // .populate("trainer");
    
    if(!members){
        throw new ApiError(404,"members not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                members,
                "Members fetched successfully"
            )
        );
});

const getMemberById = asyncHandler(async (req, res) => {

    const { memberId } = req.params;

    const member = await Member.findById(memberId)
        .populate("user", "-password -refreshToken");

    if (!member) {
        throw new ApiError(
            404,
            "Member not found"
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

const updateMember = asyncHandler(async (req, res) => {

    const { memberId } = req.params;

    const {
        phone,
        gender,
        dateOfBirth,
        address
    } = req.body;

    if (!phone || !gender || !dateOfBirth || !address) {
        throw new ApiError(
            400,
            "All fields are required"
        );
    }

    const member = await Member.findById(memberId);

    if (!member) {
        throw new ApiError(
            404,
            "Member not found"
        );
    }

    const updatedMember = await Member.findByIdAndUpdate(
        memberId,
        {
            $set: {
                phone,
                gender,
                dateOfBirth,
                address
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
                updatedMember,
                "Member details updated successfully"
            )
        );
});

const deleteMember = asyncHandler(async (req, res) => {

    const { memberId } = req.params;

    const member = await Member.findById(memberId);

    if (!member) {
        throw new ApiError(
            404,
            "Member not found"
        );
    }

    const deletedMember = await Member.findByIdAndDelete(memberId);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                deletedMember,
                "Member deleted successfully"
            )
        );
});

export {
    getMyProfile,
    updateMyProfile,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember
}