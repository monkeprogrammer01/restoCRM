import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String },
        order: { type: Number, default: 0 }
    }
)

const Category = mongoose.model("Category", categorySchema);
export default Category