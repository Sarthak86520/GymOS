import razorpay from "../utils/razorpay.js";
import {MembershipPlan} from "../models/membershipplan.model.js";
import {Membership} from "../models/membership.model.js"
import {Payment} from "../models/payment.model.js";
import {Member} from "../models/member.model.js";
import crypto from 'crypto'

import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const createRazorpayOrder = asyncHandler(async (req, res) => {
    const { planId } = req.body;

    if (!planId) {
        throw new ApiError(
            400,
            "Plan ID is required"
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

    const plan = await MembershipPlan.findOne({
        _id: planId,
        isActive: true
    });

    if (!plan) {
        throw new ApiError(
            404,
            "Membership plan not found"
        );
    }

    const options = {
        amount: plan.price * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
        member: member._id,
        plan: plan._id, // 👈 important
        amount: plan.price,
        status: "pending",
        razorpayOrderId: order.id
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                paymentId: payment._id,
                planId: plan._id
            },
            "Razorpay order created successfully"
        )
    );
});

const verifyRazorpayPayment = asyncHandler(async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body;

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature
    ) {
        throw new ApiError(
            400,
            "Payment verification details are required"
        );
    }

    const payment = await Payment.findOne({
        razorpayOrderId: razorpay_order_id
    });

    if (!payment) {
        throw new ApiError(
            404,
            "Payment record not found"
        );
    }

    if (payment.status === "success") {
        throw new ApiError(
            409,
            "Payment has already been verified"
        );
    }

    const generatedSignature = crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
        )
        .update(
            `${razorpay_order_id}|${razorpay_payment_id}`
        )
        .digest("hex");

    if (generatedSignature !== razorpay_signature) {
        payment.status = "failed";
        await payment.save();

        throw new ApiError(
            400,
            "Invalid payment signature"
        );
    }

    const member = await Member.findById(
        payment.member
    );

    if (!member) {
        throw new ApiError(
            404,
            "Member not found"
        );
    }

    const plan = await MembershipPlan.findById(
        payment.plan
    );

    if (!plan || !plan.isActive) {
        throw new ApiError(
            404,
            "Membership plan not found"
        );
    }

    const now = new Date();

    // Check existing active membership
    const existingMembership = await Membership.findOne({
        member: member._id,
        endDate: { $gt: now }
    }).sort({
        endDate: -1
    });

    let startDate = now;

    // Early renewal:
    // new membership starts after current membership ends
    if (existingMembership) {
        startDate = existingMembership.endDate;
    }

    const endDate = new Date(startDate);

    endDate.setMonth(
        endDate.getMonth() + plan.duration
    );

    const membership = await Membership.create({
        member: member._id,
        plan: plan._id,
        startDate,
        endDate
    });

    payment.status = "success";
    payment.razorpayPaymentId =
        razorpay_payment_id;

    payment.membership = membership._id;

    await payment.save();

    const updatedPayment = await Payment.findById(
        payment._id
    )
        .populate("member")
        .populate("plan")
        .populate("membership");

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedPayment,
            "Payment verified and membership activated successfully"
        )
    );
});

export {
    createRazorpayOrder,
    verifyRazorpayPayment,
}