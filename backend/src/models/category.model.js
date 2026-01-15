import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        slug: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        icon: { type: String, required: true },
        iconLib: { type: String, required: true },
        order: { type: Number, default: 0 }
    }, { timestamps: true }
)

const Category = mongoose.model("Category", categorySchema);
export default Category