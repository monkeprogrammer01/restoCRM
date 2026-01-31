import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
    {
        orderType: {
            type: String,
            enum: ["DINE_IN", "DELIVERY", "TAKEOUT"],
            required: true
        },
        tableId: {
            type: Number,
            ref: "Table",
            required: function() {
                return this.orderType === "DINE_IN"
            },
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: String,
            enum: ["PENDING", "CONFIRMED", "PREPARING", "READY", "IN_DELIVERY", "COMPLETED", "CANCELLED"],
            default: "PENDING",
            required: true
        },
        paymentMethod: {
            type: String,
            enum: ["CARD", "CASH", "ONLINE"],
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ["PENDING", "PAID", "REFUNDED"],
            default: "PENDING"
        },
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: function() {
                return this.orderType === "DELIVERY"
            }

        },
        deliveryFee: {
            type: Number,
            min: 0,
            default: 0
        },

        total_check: {
            type: Number,
            required: true,
            min: 0
        },
        items: [
            {
                dishId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
                quantity: {type: Number, required: true, min: 1},
                price: {type:Number, required: true}
            }
        ],
        notes: { type: String },
        estimatedDate: { type: Date }
    },
    { timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)

export default Order;