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
        try {
            setLoading(true);
            const existingItem = cartItems.find(item => item.dishId === dishId);
            let updatedCart;
            if (existingItem) {
                updatedCart = cartItems.map(item => item.dishId === dishId ? {...item, quantity: item.quantity + quantity} : item)
            } else {
                updatedCart = [ ...cartItems, {dishId, name, price, icon, iconLib, quantity}]
            }
            setCartItems(updatedCart);
            await AsyncStorage.setItem("cart_items", JSON.stringify(updatedCart))
        } catch (error) {
            throw error; 
        } finally {
            setLoading(false);
        }


    }

    const removeFromCart = async (dishId: string) => {
        try {
            setLoading(true);
            const updatedCart = cartItems.filter(item=> item.dishId!==dishId);
            setCartItems(updatedCart);
            await AsyncStorage.setItem("cart_items", JSON.stringify(updatedCart))

        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }

    }

    const updateQuantity = async (dishId: string, newQuantity: number) => {
        try {
            setLoading(true)
            if (newQuantity === 0) {
                await removeFromCart(dishId);
                return;
            }

            const updatedCart = cartItems.map(item => item.dishId === dishId ? {...item, quantity: newQuantity} : item)
            setCartItems(updatedCart)
            await AsyncStorage.setItem("cart_items", JSON.stringify(updatedCart))
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }
    const clearCart = async () => {
        try {
            setLoading(true);
            setCartItems([])   
            await AsyncStorage.removeItem("cart_items") 
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
        
    }

    

    return { addToCart, removeFromCart, updateQuantity, cartItems, loading, clearCart }

}