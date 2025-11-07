import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],        
        },
        password: {
            type: String,
            required: true,
            minLength: 8
        },
    }
)

const User = mongoose.model("User", userSchema);

export default User;