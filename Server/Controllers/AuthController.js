import EmailVerification from "../Models/emailVerificationModel.js";
import User from "../Models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"; // Missing import
import { verifyEmail } from "../Middlewares/email.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({ message: "Email not verified" });
    }
    
    return res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log("Error in Login Controller", error);
    return res.status(500).json({ message: "Internal server error in login" });
  }
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are required" });
  }
  
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Fix: Add await here
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = Math.random().toString(36).substring(2);

    // Fix: Add await here
    const emailVerification = await EmailVerification.create({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 3600000),
    });

    // Send verification email
    await verifyEmail(email, token);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error in Register Controller", error);
    return res
      .status(500)
      .json({ message: "Internal server error in register" });
  }
};

export const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.query;

    const record = await EmailVerification.findOne({ token });
    if (!record) return res.status(400).json({ error: "Invalid token" });

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ error: "Token expired" });
    }

    await User.findByIdAndUpdate(record.userId, { isEmailVerified: true });
    await EmailVerification.deleteOne({ _id: record._id });

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};