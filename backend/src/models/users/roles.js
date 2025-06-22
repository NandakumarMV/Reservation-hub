import mongoose from "mongoose";

const RolesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        handle: {
            type: String,
            unique: true,
            required: true
        },
        status: { type: Boolean, default: true }
    },
    {
        strict: true,
        timestamps: true,
    },
);



const RolesModel = mongoose.model("roles", RolesSchema);
export default RolesModel;
