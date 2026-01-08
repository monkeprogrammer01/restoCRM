import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
    try {
        const { name, image, order } = req.body;

        if (!name) return res.status(400).json({message: "Bad request"});

        const newCategory = await Category.create({name, image, order});
        return res.status(201).json({message: "New category created.", newCategory})
    } catch (error) {
        console.error("Error in createCategory controller");
        return res.status(500).json({message: "Internal server error"})
    }
}

export const getCategories = async (req, res) => {
    try {
        const allCategories = await Category.find().sort({order: 1}).select("-__v").lean();
        return res.status(200).json(allCategories)        
    } catch (error) {
        console.error("Error in getCategories");
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
        const categoryId = req.params.id
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, {
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