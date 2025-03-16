import { transporter } from "../utils/node_mailer.js";


export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: `"Your Company" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Your OTP Code",
    html: `
      <h2>OTP Verification</h2>
      <p>Your OTP code is: <b>${otp}</b></p>
      <p>This OTP is valid for ${process.env.OTP_EXPIRY} minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};
