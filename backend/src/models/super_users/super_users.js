import mongoose from "mongoose";

const SuperUsersSchema = new mongoose.Schema(
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
    status: { type: Boolean, required: true }
  },
  {
    strict: true,
    timestamps: true,
  },
);

SuperUsersSchema.index({ email: 1 });

const SuperUserModel = mongoose.model("Super_users", SuperUsersSchema);
export default SuperUserModel;
