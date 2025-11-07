import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db.js"
import orderRoute from "./routes/order.route.js"
import reservationRoute from "./routes/reservation.route.js"
import authRoute from "./routes/auth.route.js"
import { Server } from "socket.io"
import http from "http"
import { initSocket } from "./lib/socket.js"
import cookieParser from "cookie-parser"
dotenv.config()
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/orders", orderRoute)
app.use("/api/reservations", reservationRoute)
app.use("/api/auth", authRoute)
app.get("/", (req, res) => {
    res.send("backend works")
})

const server = http.createServer(app);

initSocket(server)

const PORT = process.env.PORT;
server.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});