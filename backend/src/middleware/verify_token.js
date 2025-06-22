import jwt from "jsonwebtoken";
import { AppError } from "../utils/error_handler.js";
import dotenv from "dotenv";
import UserModel from "../models/users/users.js";

const envFile = `.env.${process.env.NODE_ENV || "prod"}`;
dotenv.config({ path: envFile });

export const verifySuperUserToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError("Access Denied", 403);
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded || !decoded.userId) {
            throw new AppError("Access Denied", 403);
        }
        const user_id = decoded.userId
        const user = await UserModel.findOne({ _id: user_id }).populate("role").lean()
        if (!user || user.role.handle !== 'admin') throw new AppError("Access Denied", 403)
        req.headers = { user: user_id };

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            next(new AppError("Token expired", 401));
        } else if (error instanceof jwt.JsonWebTokenError) {
            next(new AppError("Access Denied", 403));
        } else {
            next(error);
        }
    }
};


export const verifyVendorToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError("Access token missing or malformed", 401);
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded || !decoded.userId) {
            throw new AppError("Access Denied", 403);
        }
        const user_id = decoded.userId
        const user = await UserModel.findOne({ _id: user_id })
        if (!user) throw new AppError("Access Denied", 403)
        req.headers = { user: user_id };

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            next(new AppError("Token expired", 401));
        } else if (error instanceof jwt.JsonWebTokenError) {
            next(new AppError("Access Denied", 403));
        } else {
            next(error);
        }
    }
};