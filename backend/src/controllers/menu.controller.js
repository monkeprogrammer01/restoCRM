import Menu from '../models/menu.model'

export const getAllMenu = async (req, res) => {
    try {
        const filter = {isAvailable: true}
        const {category} = req.query
        if (category) {
            filter.category = category
        }
        const menuItems = await Menu.find(filter).populate('category')
        return res.status(200).json(menuItems)
    } catch (error) {
        console.error("Error in getAllMenu", error.message);
        return res.status(500).json({message: "Internal server error"})
    }
}
