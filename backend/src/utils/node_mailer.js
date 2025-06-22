import nodemailer from "nodemailer";
import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV || "prod"}`;
dotenv.config({ path: envFile });

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});