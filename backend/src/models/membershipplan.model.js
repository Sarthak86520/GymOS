import mongoose from 'mongoose';

const membershipPlanSchema = new mongoose.Schema(
    {
        name: String,

        duration: Number, // months

        price: Number,

        description: String,

        features: [String],

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const MembershipPlan = mongoose.model(
    "MembershipPlan",
    membershipPlanSchema
);

export default MembershipPlan;