import { useCart } from "@/hooks/useCart"
import { CartItem } from "@/types/cart.types";
import { createContext } from "react";

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (dishId: string, name: string, price: number, icon: string, iconLib: string, quantity: number) => void; 
    removeFromCart: (dishId: string) => void;
    updateQuantity: (dishId: string, count: number) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = async () => {
    
}