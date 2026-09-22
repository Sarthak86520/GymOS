import mongoose from "mongoose";

const testimonialSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        image: {
            type: String,
            default: ""
        },

        message: {
            type: String,
            required: true
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        }
    },
    { timestamps: true }
);

const Testimonial = mongoose.model(
    "Testimonial",
    testimonialSchema
);

export default Testimonial;