import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import {Gallery} from "../models/gallery.model.js"

const createGallery = asyncHandler(async (req, res) => {
    if (req.user?.role !== "admin") {
        throw new ApiError(
            403,
            "Only admin can create gallery items"
        );
    }

    const { title, category } = req.body;

    if (!title || !category) {
        throw new ApiError(
            400,
            "Title and category are required"
        );
    }

    if (!req.file) {
        throw new ApiError(
            400,
            "Gallery image is required"
        );
    }

    const uploadedImage = await uploadOnCloudinary(
        req.file.path
    );

    if (!uploadedImage) {
        throw new ApiError(
            400,
            "Image upload failed"
        );
    }

    const gallery = await Gallery.create({
        image: uploadedImage.url,
        title,
        category
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            gallery,
            "Gallery item created successfully"
        )
    );
});

const getAllGallery = asyncHandler(async (req, res) => {
    const gallery = await Gallery.find()
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            gallery,
            "Gallery fetched successfully"
        )
    );
});

const getGalleryById = asyncHandler(async (req, res) => {
    const { galleryId } = req.params;

    const gallery = await Gallery.findById(galleryId);

    if (!gallery) {
        throw new ApiError(
            404,
            "Gallery item not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            gallery,
            "Gallery item fetched successfully"
        )
    );
});

const updateGallery = asyncHandler(async (req, res) => {
    if (req.user?.role !== "admin") {
        throw new ApiError(
            403,
            "Only admin can update gallery items"
        );
    }

    const { galleryId } = req.params;
    const { title, category } = req.body;

    const gallery = await Gallery.findById(galleryId);

    if (!gallery) {
        throw new ApiError(
            404,
            "Gallery item not found"
        );
    }

    let imageUrl = gallery.image;

    if (req.file) {
        const uploadedImage = await uploadOnCloudinary(
            req.file.path
        );

        if (!uploadedImage) {
            throw new ApiError(
                400,
                "Image upload failed"
            );
        }

        imageUrl = uploadedImage.url;
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
        galleryId,
        {
            $set: {
                title,
                category,
                image: imageUrl
            }
        },
        {
            new: true,
            runValidators: true
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedGallery,
            "Gallery item updated successfully"
        )
    );
});

const deleteGallery = asyncHandler(async (req, res) => {
    if (req.user?.role !== "admin") {
        throw new ApiError(
            403,
            "Only admin can delete gallery items"
        );
    }

    const { galleryId } = req.params;

    const gallery = await Gallery.findById(galleryId);

    if (!gallery) {
        throw new ApiError(
            404,
            "Gallery item not found"
        );
    }

    const deletedGallery =
        await Gallery.findByIdAndDelete(galleryId);

    return res.status(200).json(
        new ApiResponse(
            200,
            deletedGallery,
            "Gallery item deleted successfully"
        )
    );
});

export {
    createGallery,
    getAllGallery,
    getGalleryById,
    updateGallery,
    deleteGallery
}