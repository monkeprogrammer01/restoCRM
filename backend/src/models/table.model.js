import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
    {
        number: {
            type: Number,
            required: true,
            unique: true
        },
        capacity: {
            type: Number,
            min: 2,
            required: true
        },
        isOccupied: {
            type: Boolean,
            default: false
        }
    }
)

const Table = mongoose.model("Table", tableSchema) 
export default Table;