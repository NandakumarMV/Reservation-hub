import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
    },
    mobile: {
      type: String,
      required: true,
      unique: true
    },
    country_code: {
      type: String,
      required: true,
      match: /^\d+/,
    },
    nationality: {
      type: String,
      required: false,
    },
    profile_img: { type: String },
    status: { type: Boolean, required: true },
    role: { type: mongoose.Schema.ObjectId, ref: "roles", required: true, index: true },
  },
  {
    strict: true,
    timestamps: true,
  },
);

UsersSchema.index({ email: 1 });

const UserModel = mongoose.model("users", UsersSchema);
export default UserModel;
