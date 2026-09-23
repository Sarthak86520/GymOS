import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
    {
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Member",
            required: true
        },

        plan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MembershipPlan",
            required: true
        },

        membership: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Membership",
            default: null
        },

        amount: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["pending", "success", "failed"],
            default: "pending"
        },

        razorpayOrderId: {
            type: String,
            required: true
        },

        razorpayPaymentId: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export const Payment = mongoose.model(
    "Payment",
    paymentSchema
);

