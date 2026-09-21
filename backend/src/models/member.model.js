import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        phone: {
            type: String,
            trim: true
        },

        dateOfBirth: {
            type: Date
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"]
        },

        address: {
            type: String,
            trim: true
        },

        trainer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trainer",
            default: null
        }
    },
    {
        timestamps: true
    }
);

export const Member = mongoose.model("Member", memberSchema);

