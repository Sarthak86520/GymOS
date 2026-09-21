import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        bio: String,

        experience: Number,

        specialization: [String],

        certifications: [String],

        image: String
    },
    {
        timestamps: true
    }
);

const Trainer = mongoose.model('Trainer', trainerSchema);

export default Trainer;