import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
    {
        tableId: {
            type: Number,
            ref: "Table",
            required: true,
        },
        staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff",
            required: true,
        },
        status: {
            type: String,
            enum: ["PENDING", "IN-PROGRESS", "COMPLETED", "CANCELLED"],
            default: "PENDING",
            required: true
        },
        total_check: {
            type: Number,
            required: true
        },
        items: [
            {
                dishId: { type: mongoose.Schema.Types.ObjectId, ref: "Dish", required: true },
                quantity: {type: Number, required: true, min: 1},
                price: {type:Number, required: true}
            }
        ] 
    },
    { timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)

export default Order;