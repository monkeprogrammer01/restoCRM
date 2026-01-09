import Menu from '../models/menu.model.js'
import Category from '../models/category.model.js';
import { cloudinary } from '../lib/cloudinary.js';

export const createMenu = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        let imageUrl = ""
        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;
            const uploadRes = await cloudinary.uploader.upload(dataURI, {
                folder: "menu_items"
            })
            imageUrl = uploadRes.secure_url;
        }
        if (!name || !price) {
            return res.status(400).json({message: "Bad request"})
        }
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({message: "Category does not exist"})
        }
        const newMenu = await Menu.create({
            name, description, price, category, image: imageUrl
        })
        const fullMenuInfo = await newMenu.populate("category", "name image"); 
        return res.status(201).json(fullMenuInfo);    } catch (error) {
        console.error("Error in createMenu controller", error.message);
        return res.status(500).json({message: "Internal server error"})
    }
}

export const getAllMenu = async (req, res) => {
    try {
        const filter = {isAvailable: true}
        const {category} = req.query
        if (category) {
            filter.category = category
        }
        const menuItems = await Menu.find(filter).populate('category', 'name image').select("-__v")
        return res.status(200).json(menuItems)
    } catch (error) {
        console.error("Error in getAllMenu", error.message);
        return res.status(500).json({message: "Internal server error"})
    }
}

export const updateMenuById = async (req, res) => {
    try {
        const menuId = req.params.id;
        if (req.body.category){
            const categoryExists = await Category.findById(req.body.category);
            if (!categoryExists) {
                return res.status(400).json({message: "Bad request. Category does not exist"})
            }        
        } 

        const updatedMenu = await Menu.findByIdAndUpdate(menuId, req.body, {
            new: true,
            runValidators: true
        })
        if (!updatedMenu) {
            return res.status(404).json({message: "Menu not found"})
        }
        return res.status(200).json(updatedMenu)
    } catch (error) {
        console.error("Error in updateMenuById controller")
        return res.status(500).json({message: "Internal server error"})
    }
}

export const deleteMenuById = async (req, res) => {
    try {
        const menuId = req.params.id;
        const deletedMenu = await Menu.findByIdAndDelete(menuId);
        if (!deletedMenu) {
            return res.status(404).json({message: "Menu not found"})
        }
        return res.status(200).json({message: "Item deleted successfully", deletedMenu});
    } catch (error) {
        console.error("Error in deleteMenuById controller")
        return res.status(500).json("Internal server error")
    }
}