import UserModel from "../../models/users/users.js";
import { AppError, errorHandler } from "../../utils/error_handler.js";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
} from "../../utils/jwt.js";
import { generateOTP } from "../../utils/otp-generator.js";
import { storeOTP, verifyOTP } from "../../cache/otp_cache.js";
import { sendOTPEmail } from "../../helpers.js/send_mail.js";
import UsersTokenModel from "../../models/users/user_tokens.js";
import moment from "moment";
import generateNewRefreshToken from "../../helpers.js/generate_refresh_token.js";
import RolesModel from "../../models/users/roles.js";


const createSuperUser = async (
  {
    name,
    email,
    mobile,
    country_code,
    nationality,
    profile_img,
  }
) => {
  try {

    const exists = await UserModel.findOne({ mobile }).lean()
    const adminRole = await RolesModel.findOne({ handle: "admin" })
    if (exists) throw new AppError("Mobile Number Already in use", 400);

    const newUser = new UserModel({
      name,
      mobile,
      country_code,
      email,
      status: true,
      nationality,
      role: adminRole._id
    })
    await newUser.save()

    return { message: "Super User Created !!" }
  } catch (error) {
    console.log(error);
    throw error
  }
}


const sendOTP = async ({ mobile }) => {
  try {
    console.log(mobile);

    if (!mobile) throw new AppError("Mobile Number is Required");

    const user = await UserModel.findOne({ mobile })
    if (!user) throw new AppError("Invaild User", 401);

    const otp = generateOTP();

    await storeOTP(user._id, otp);

    try {
      await sendOTPEmail(user.email, otp);
    } catch (error) {
      throw new AppError("Error While Sending Otp", 400);
    }

    return { message: "OTP SEND SUCCESSFULLY !" }
  } catch (error) {
    console.log(error);

    throw error
  }

};


const verifyOtp = async ({ otp, mobile }) => {
  try {

    const user = await UserModel.findOne({ mobile });
    if (!user) throw new AppError("Invalid User", 401);

    const isVerified = verifyOTP(user._id, otp)
    if (!isVerified) throw new AppError("Invalid OTP !", 401);

    const accessToken = generateAccessToken({ _id: user._id });
    const refreshToken = generateRefreshToken({ _id: user._id });

    let userToken = await UsersTokenModel.findOne({ user: user._id })
    const expiresAt = moment().add(7, "days").toDate();
    if (userToken) {
      userToken.token = refreshToken
      userToken.expiresAt = expiresAt
    } else {
      userToken = new UsersTokenModel({ user: user._id, token: refreshToken, expiresAt: expiresAt })
    }
    await userToken.save()

    return { message: "OTP VERIFIED !", accessToken, refreshToken }
  } catch (error) {
    console.log(error);

    throw error
  }
};

const refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const decoded = verifyRefreshToken(token);
  if (!decoded) return res.status(403).json({ message: "Invalid refresh token" });

  const userId = decoded.userId;

  const userToken = await UsersTokenModel.findOne({ user: userId, token });
  if (!userToken) return res.status(403).json({ message: "Refresh token not recognized" });

  const newAccessToken = generateAccessToken({ _id: userId });
  const newRefreshToken = generateRefreshToken({ _id: userId });


  userToken.token = newRefreshToken;
  userToken.expiresAt = moment().add(7, 'days').toDate();
  await userToken.save();

  res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
};


const logout = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: "Token required" });

  await UsersTokenModel.deleteOne({ token });

  res.status(200).json({ message: "Logged out successfully" });
};


export {
  createSuperUser,
  sendOTP,
  verifyOtp,
  refreshToken,
  logout
}