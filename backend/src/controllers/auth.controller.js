import User from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";

export const signup = async(req, res) => {
    const {fullName, phoneNumber, password} = req.body;

    try {
        if (password.length < 8) {
            return res.status(400).json({message: "Password must be at least 8 characters"})
        }
        const user = await User.findOne({phoneNumber})

        if (user) return res.status(400).json({message: "Email already exists"})
        
            
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName: fullName,
            phoneNumber: phoneNumber,
            password: hashedPassword
        })
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName
            })
        } else {
            res.status(400).json({message: "Invalid user data"})
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500, "Internal Server Error");
    }
}

export const login = async(req, res) => {
    try {
        const {phoneNumber, password} = req.body;
        if (!phoneNumber || !password) return res.status(400).json({message: "Phone number and password are required"});
        const user = await User.findOne({phoneNumber}).select("+password");
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(401).json({message: "Invalid credentials"});
        const token = generateToken(user._id, res);
        return res.status(201).json(
            {
                success: true,
                userId: user._id,
                fullName: user.fullName,
                message: "Logged in successfully",
            }
        )
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const profile = async(req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(400).json({message: "User not found"})
        }
        return res.status(200).json({
            fullName: user.fullName,
            phoneNumber: user.phoneNumber
        })
    } catch (error) {
        console.log("Ошибка getProfile:", error);
        return res.status(500).json({ message: error });
    }
}