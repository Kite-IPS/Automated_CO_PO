import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const verifyEmail = async (toEmail, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const verificationUrl = `${process.env.BASE_URL}/verify-email`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: toEmail,
      subject: "Email Verification For the Automated CO-PO Mapping System",
      html: `
        <p>Your OTP for email verification is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
        <p>Please visit the following link and enter your OTP:</p>
        <p style="color: blue;">${verificationUrl}</p>
        <p>If you did not request this verification, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to", toEmail);
  } catch (error) {
    console.log("Error in Email Middleware", error);
    throw new Error("Email sending failed");
  }
};
