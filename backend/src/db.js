import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
            console.log("DB connected", mongoose.connection.name);
    } catch (error) {
        console.log("Not connected db", error)
    }

}

export default connectDB;