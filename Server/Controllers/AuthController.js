import User from "../Models/userModel.js";
import bcryptjs from 'bcryptjs';

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
    
        if(!isMatch){
            return res.status(400).json({message:"Invalid Username or Password"});
        }

        return res.status(200).json({
            message: "Login successful",
            token: generateToken(user._id),
        });

    } catch (error) {
        console.log("Error in Login Controller",error);
        return res.status(500).json({ message: "Internal server error in login" });
    }
}
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, and password are required" });
    }
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const User = User.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Error in Register Controller",error);
        return res.status(500).json({ message: "Internal server error in register" });
    }
}   