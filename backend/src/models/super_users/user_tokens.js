import mongoose from "mongoose";

const SuperUsersTokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "super_users", required: true, index: true },
    token: { type: String, required: true },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: "7d" }
    }
  },
  {
    strict: true,
    timestamps: true,
  },
);



const SuperUsersTokenModel = mongoose.model("User_tokens", SuperUsersTokenSchema);
export default SuperUsersTokenModel;
