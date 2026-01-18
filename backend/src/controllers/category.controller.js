import Category from "../models/category.model.js";
import { cloudinary, upload } from "../lib/cloudinary.js";
 
// TO-DO: update category, menu schemas and controllers to delete images from cloudinary when delete request makes

export const createCategory = async (req, res) => {
    try {
        const { slug, name, icon, iconLib, order } = req.body;
        let imageUrl = "";
        if (!name) return res.status(400).json({message: "Bad request"});
        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;
            const uploadRes = await cloudinary.uploader.upload(dataURI, {
                folder: "categories"
            })
            imageUrl = uploadRes.secure_url;
        }
        const newCategory = await Category.create({slug, name, icon, iconLib, order});
        return res.status(201).json({message: "New category created.", newCategory})
    } catch (error) {
        console.error("Error in createCategory controller", error);
        return res.status(500).json({message: "Internal server error"})
    }
}

export const getCategories = async (req, res) => {
    try {
        const allCategories = await Category.find().sort({order: 1}).select("-__v").lean();
        return res.status(200).json(allCategories)        
    } catch (error) {
        console.error("Error in getCategories", error);
        return res.status(500).json({message: "Internal server error"})
    }

}

export const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const selectedCategory = await Category.findById(categoryId);
        if (!selectedCategory) return res.status(404).json({message: "Category not found"})
        return res.status(200).json(selectedCategory)
    } catch (error) {
        console.error("Error in getCategoryById")
        return res.status(500).json("Internal server error")
    }

}

export const updateCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updateData = { ...req.body }

        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = `data:${req.file.mimetype};base64,${b64}`
            const uploadRes = await cloudinary.uploader.upload(dataURI, {
                folder: "categories"
            })
            updateData.imageUrl = uploadRes.secure_url;
        }

        const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateData, {
            new: true, runValidators: true
        })
        if (!updatedCategory) {
            return res.status(404).json({message: "Category not found"})
        }
        return res.status(200).json(updatedCategory)
    } catch (error) {
        console.error("Error in updateCategoryById")
        return res.status(500).json("Internal server error")
    }
}

export const deleteCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await Category.findByIdAndDelete(categoryId)
        if (!deletedCategory) return res.status(404).json({message: "Category not found"})
        return res.status(200).json({message: "Category deleted.", deletedCategory})
    } catch (error) {
        console.error("Error in deleteCategoryById");
        return res.status(500).json({message: "Internal server error"})
    }
}
