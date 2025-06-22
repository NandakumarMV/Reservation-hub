import { Router } from "express";
import { createSuperUser, logout, refreshToken, sendOTP, verifyOtp } from "../../services/super_admin/super_users.js";
import { userSchema } from "../../validators/super_user_validator.js";



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
    return res.status(200).json(await logout({ ...req.body, ...req.headers }))
  } catch (error) {
    next(error)
  }
}




SuperUserRouter.post("/create", createSuperUserHandler)
SuperUserRouter.post("/otp", sendOtpHandler)
SuperUserRouter.post("/otp/verify", verifyOtpHandler)
SuperUserRouter.post("/refreshtoken", generateRefreshTokenHandler)
SuperUserRouter.post("/logout", deleteTokenHandler)

export default SuperUserRouter