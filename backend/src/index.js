import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db.js"
dotenv.config()
connectDB();
const app = express()
app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
    res.send("backend works")
})

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});