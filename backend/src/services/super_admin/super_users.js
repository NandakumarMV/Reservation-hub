import SuperUserModel from "../../models/super_users/super_users.js";
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
import SuperUsersTokenModel from "../../models/super_users/user_tokens.js";
import moment from "moment";


const createSuperUser = async (
  {
    name,
    email,
    mobile,
    country_code,
    nationality,
    profile_img
  }
) => {
  try {

    const exists = await SuperUserModel.findOne({ mobile }).lean()

    if (exists) throw new AppError("Mobile Number Already in use", 400);

    const newUser = new SuperUserModel({
      name,
      mobile,
      country_code,
      email,
      status: true,
      nationality,
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
    if (!mobile) throw new AppError("Mobile Number is Required");

    const user = await SuperUserModel.findOne({ mobile })
    if (!user) throw new AppError("Invaild User");

    const otp = generateOTP();

    await storeOTP(user._id, otp);

    try {
      const emailSent = await sendOTPEmail(user.email, otp);
    } catch (error) {
      throw new AppError("Error While Sending Otp");
    }

    return { message: "OTP SEND SUCCESSFULLY !" }
  } catch (error) {
    console.log(error);

    throw error
  }

};


const verifyOtp = async ({ otp, mobile }) => {
  try {

    const user = await SuperUserModel.findOne({ mobile });
    if (!user) throw new AppError("Invalid User");

    const isVerified = verifyOTP(user._id, otp)
    if (!isVerified) throw new AppError("Invalid OTP !");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    let userToken = await SuperUsersTokenModel.findOne({ user: user._id })
    const expiresAt = moment().add(7, "days").toDate();
    if (userToken) {
      userToken.token = refreshToken
      userToken.expiresAt = expiresAt
    } else {
      userToken = new SuperUsersTokenModel({ user: user._id, token: refreshToken, expiresAt: expiresAt })
    }
    await userToken.save()

    return { message: "OTP VERIFIED !", accessToken, refreshToken }
  } catch (error) {
    console.log(error);

    throw error
  }
};

const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  if (!refreshTokens.includes(token)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  const decoded = verifyRefreshToken(token);
  if (!decoded) return res.status(403).json({ message: "Invalid refresh token" });

  // Generate new tokens
  const newAccessToken = generateAccessToken({ _id: decoded.userId });
  const newRefreshToken = generateRefreshToken({ _id: decoded.userId });

  // Replace old refresh token with a new one
  refreshTokens = refreshTokens.filter(t => t !== token);
  refreshTokens.push(newRefreshToken);

  res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
};

const logout = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token); // Remove from storage
  res.status(200).json({ message: "Logged out successfully" });
};

export {
  createSuperUser,
  sendOTP,
  verifyOtp
}