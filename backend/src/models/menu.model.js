import mongoose from "mongoose";

const menuSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Названия блюда обязательно'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Описание обязательно']
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        image: {type: String},
        isAvailable: {type: Boolean, default: true}
    }, {timestamps: true}
)

const Menu = mongoose.model("Menu", menuSchema)
export default Menu;