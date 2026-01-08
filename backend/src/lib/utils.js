import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/auth.model.js";
dotenv.config();
export const generateToken = (userId, res) => {
    const token = jwt.sign({userId: userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",

    })
    return token;
}

export const verifyToken = (token) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return {
            success: true,
            userId: decoded.userId
        }
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
}

export const authMiddleware = async (req, res, next) => {
    try {
        let token = null;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1]
        } else {
            token = req.cookies.jwt;
        }
        if (!token) {
            return res.status(400).json({message: "Token Not Found"})
        }
        const result = verifyToken(token);
        if (!result.success) {
            return res.status(401).json({
                message: "Invalid Token"
            })
        }

        const user = await User.findById(result.userId)
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        req.user = user;
        console.log(user.role)
        req.userId = result.userId;
        next();
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const roleMiddleware = (roles) => (req, res, next) => {
    
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({message: "Access denied"});
    }
    next();
}