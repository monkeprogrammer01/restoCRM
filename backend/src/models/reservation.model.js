import mongoose from "mongoose"

const reservationSchema = new mongoose.Schema(
    {
        tableId: {
            type: Number,
            ref: "Table",
            required: true
        },
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff",
            required: true,
        },
        customerName: {
            type: String,
            required: true
        },
        customerNumber: {
            type: String,
            required: true,
            match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
            
        },
        guestCount: {
            type: Number,
            required: true,
            min: 1
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
            default: "PENDING"
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            default: null
        }

    },
    {timestamps: true}
)

const Reservation = mongoose.model("Reservation", reservationSchema)

export default Reservation