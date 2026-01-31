import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        building: { type: String, required: true },
        apartment: { type: String }, entrance: { type: String }, floor: { type: String }, isDefault: { type: Boolean, default: false }
    },
    { timestamps: true }
)

const Address = mongoose.model("Address", addressSchema)
export default Address;