import mongoose from "mongoose";

const UsersTokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "users", required: true, index: true },
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



const UsersTokenModel = mongoose.model("user tokens", UsersTokenSchema);
export default UsersTokenModel;
