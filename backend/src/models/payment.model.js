import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Member",
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

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;