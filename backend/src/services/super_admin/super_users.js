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
import generateNewRefreshToken from "../../helpers.js/generate_refresh_token.js";


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

    const accessToken = generateAccessToken({ _id: user._id });
    const refreshToken = generateRefreshToken({ _id: user._id });

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

const refreshToken = async ({ user, token, userId }) => {
  try {
    if (!token) throw new AppError("Token is Required", 400);
    const tokenData = await generateNewRefreshToken(token, user, userId)
    return tokenData
  } catch (error) {
    throw error
  }
};

const logout = ({ user, token }) => {
  try {
    if (!token) throw new AppError("Token is Required", 400);
    const data = deleteToken(token, user)
    return data
  } catch (error) {
    throw error
  }
};

export {
  createSuperUser,
  sendOTP,
  verifyOtp,
  refreshToken,
  logout
}