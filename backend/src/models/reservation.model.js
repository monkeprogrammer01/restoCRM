import mongoose from "mongoose"

const reservationSchema = new mongoose.Schema(
    {
        tableId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Table",
            required: true
        },
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff",
            required: true,
        },
        customerNumber: {
            type: String,
            required: true,
            match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
            
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true
        }

    },
    {timestamps: true}
)

const Reservation = mongoose.model("Reservation", resrvationSchema)

export default Reservation