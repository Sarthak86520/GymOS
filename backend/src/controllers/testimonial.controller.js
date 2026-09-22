import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

import Testimonial from "../models/testimonial.model.js";

const createTestimonial = asyncHandler(async (req, res) => {
    const { message, rating } = req.body;

    if (!message || !rating) {
        throw new ApiError(
            400,
            "Message and rating are required"
        );
    }

    if (rating < 1 || rating > 5) {
        throw new ApiError(
            400,
            "Rating must be between 1 and 5"
        );
    }

    const existingTestimonial = await Testimonial.findOne({
        user: req.user._id
    });

    if (existingTestimonial) {
        throw new ApiError(
            409,
            "You have already submitted a testimonial"
        );
    }

    let imageUrl = "";

    if (req.file) {
        const image = await uploadOnCloudinary(req.file.path);

        if (!image) {
            throw new ApiError(
                400,
                "Image upload failed"
            );
        }

        imageUrl = image.url;
    }

    const testimonial = await Testimonial.create({
        user: req.user._id,
        message,
        rating,
        image: imageUrl
    });

    const createdTestimonial = await Testimonial.findById(
        testimonial._id
    ).populate(
        "user",
        "-password -refreshToken"
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            createdTestimonial,
            "Testimonial created successfully"
        )
    );
});

const getAllTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find()
        .populate("user", "-password -refreshToken")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            testimonials,
            "Testimonials fetched successfully"
        )
    );
});

const getTestimonialById = asyncHandler(async (req, res) => {
    const { testimonialId } = req.params;

    const testimonial = await Testimonial.findById(testimonialId)
        .populate("user", "-password -refreshToken");

    if (!testimonial) {
        throw new ApiError(
            404,
            "Testimonial not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            testimonial,
            "Testimonial fetched successfully"
        )
    );
});

const updateMyTestimonial = asyncHandler(async (req, res) => {
    const { testimonialId } = req.params;

    const {
        message,
        rating
    } = req.body;

    const testimonial = await Testimonial.findById(testimonialId);

    if (!testimonial) {
        throw new ApiError(
            404,
            "Testimonial not found"
        );
    }

    // User sirf apna testimonial update kar sakta hai
    if (testimonial.user.toString() !== req.user._id.toString()) {
        throw new ApiError(
            403,
            "You can only update your own testimonial"
        );
    }

    if (rating !== undefined && (rating < 1 || rating > 5)) {
        throw new ApiError(
            400,
            "Rating must be between 1 and 5"
        );
    }

    let imageUrl = testimonial.image;

    // New image upload ki gayi hai to purani image replace hogi
    if (req.file) {
        const image = await uploadOnCloudinary(req.file.path);

        if (!image) {
            throw new ApiError(
                400,
                "Image upload failed"
            );
        }

        imageUrl = image.url;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
        testimonialId,
        {
            $set: {
                message,
                rating,
                image: imageUrl
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

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedTestimonial,
            "Testimonial updated successfully"
        )
    );
});

const deleteMyTestimonial = asyncHandler(async (req, res) => {
    const { testimonialId } = req.params;

    const testimonial = await Testimonial.findById(testimonialId);

    if (!testimonial) {
        throw new ApiError(
            404,
            "Testimonial not found"
        );
    }

    if (
        testimonial.user.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You can only delete your own testimonial"
        );
    }

    const deletedTestimonial =
        await Testimonial.findByIdAndDelete(testimonialId);

    return res.status(200).json(
        new ApiResponse(
            200,
            deletedTestimonial,
            "Testimonial deleted successfully"
        )
    );
});


export {
    createTestimonial,
    getAllTestimonials,
    getTestimonialById,
    updateMyTestimonial,
    deleteMyTestimonial
}