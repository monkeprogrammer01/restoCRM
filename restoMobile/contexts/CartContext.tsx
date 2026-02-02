import { useCart } from "@/hooks/useCart"
import { CartItem } from "@/types/cart.types.js";
import { createContext, ReactNode, useContext } from "react";

type CartContextType = ReturnType<typeof useCart>
export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ( {children}: {children: ReactNode} ) => {
    const cart = useCart();
    return (
        <CartContext.Provider value={cart}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within CartProvider');
    }
    return context;
}