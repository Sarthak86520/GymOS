import mongoose from "mongoose";

const machineSchema = new mongoose.Schema(
    {
        name: String,

        description: String,

        muscleGroup: [String],

        image: String,

        quantity: {
            type: Number,
            default: 1
        },

        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Machine = mongoose.model(
    "Machine",
    machineSchema
);

export default Machine;