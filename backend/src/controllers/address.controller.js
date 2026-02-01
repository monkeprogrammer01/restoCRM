import Address from "../models/address.model.js";

export const createAddress = async (req, res) => {
    try {
        const { userId, city, street, building, apartment } = req.body;
        const newAddress = await Address.create(
            {
                userId,
                city,
                street,
                building,
                apartment
            }
        )
        return res.status(200).json(newAddress);        
    } catch (error) {
        return res.status(500).json({message: "Internal server error."})
    }

}