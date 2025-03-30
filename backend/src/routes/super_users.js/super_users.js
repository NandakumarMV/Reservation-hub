import { Router } from "express";
import { createSuperUser, refreshToken, sendOTP, verifyOtp } from "../../services/super_admin/super_users.js";
import { userSchema } from "../../validators/super_user_validator.js";
import { deleteToken } from "../../helpers.js/generate_refresh_token.js";

const SuperUserRouter = new Router()

const createSuperUserHandler = async (req, res, next) => {
  try {
    const data = userSchema.safeParse(req.body)

    if (!data.success) {
      return res.status(400).json({
        success: false,
        errors: data.error.errors.map(err => err.message),
      });
    }

    return res.status(200).json(await createSuperUser({ ...req.body }))

  } catch (error) {
    next(error)
  }
}

const sendOtpHandler = async (req, res, next) => {
  try {
    return res.status(200).json(await sendOTP({ ...req.body }))
  } catch (error) {
    next(error)
  }
}
const verifyOtpHandler = async (req, res, next) => {
  try {
    return res.status(200).json(await verifyOtp({ ...req.body }))
  } catch (error) {
    next(error)
  }
}
const generateRefreshTokenHandler = async (req, res, next) => {
  try {
    return res.status(200).json(await refreshToken({ ...req.body }))
  } catch (error) {
    next(error)
  }
}
const deleteTokenHandler = async (req, res, next) => {
  try {
    return res.status(200).json(await deleteToken({ ...req.body, ...req.headers }))
  } catch (error) {
    next(error)
  }
}
SuperUserRouter.post("/superuser/create", createSuperUserHandler)
SuperUserRouter.post("/superuser/otp", sendOtpHandler)
SuperUserRouter.post("/superuser/otp/verify", verifyOtpHandler)
SuperUserRouter.post("/superuser/refreshtoken", generateRefreshTokenHandler)
SuperUserRouter.post("/superuser/logout", deleteTokenHandler)

export default SuperUserRouter