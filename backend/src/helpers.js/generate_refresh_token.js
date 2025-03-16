import SuperUsersTokenModel from "../models/super_users/user_tokens.js";
import { AppError } from "../utils/error_handler.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";


const generateNewRefreshToken = async (token, user, userId) => {
  try {

    const decoded = verifyRefreshToken(token);
    if (!decoded) throw new AppError("Invalid Token", 401);


    // Generate new tokens
    const newAccessToken = generateAccessToken({ _id: decoded.userId });
    const newRefreshToken = generateRefreshToken({ _id: decoded.userId });
    const expiresAt = moment().add(7, "days").toDate();

    if (user == 'customer') {

    } else {
      const userToken = await SuperUsersTokenModel.findOne({ user: userId, token: token })
      if (!userToken) throw new AppError("Invaild Token", 401);
      userToken.token = newRefreshToken
      userToken.expiresAt = expiresAt
      await userToken.save()
    }

    return { refreshToken: newRefreshToken, accessToken: newAccessToken }

  } catch (error) {
    throw error
  }
}

export default generateNewRefreshToken