import { CartItem } from "@/types/cart.types";
import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
export const useCart = () => {
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const savedCart = await AsyncStorage.getItem("cart_items");
                if (savedCart) {
                    setCartItems(JSON.parse(savedCart))
                }
            } catch (error) {
                console.error("Error in loadCart.", error)
            }
        };
        loadCart();
    }, [])

    const addToCart = async (dishId: string, name: string, price: number, icon: string, iconLib: string, quantity: number) => {
        setLoading(true);
        

    }

}