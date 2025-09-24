import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const verifyEmail = async (toEmail, token) => {
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

    const url = `${process.env.BASE_URL}/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: toEmail,
      subject: "Email Verification For the Automated CO-PO Mapping System",
      html: `<p>Please click the link to verify your email:</p>
        <a href="${url}" style="color: blue; text-decoration: underline;">Click Here</a>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to", toEmail);
  } catch (error) {
    console.log("Error in Email Middleware", error);
    throw new Error("Email sending failed");
  }
};
