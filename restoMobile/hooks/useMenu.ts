import { useState } from "react"
import { menuService } from "@/services/menu.service";
import { Dish } from "@/types/menu.types";
export const useMenu = async () => {
    const [loading, setLoading] = useState(false);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const fetchDishes = async () => {
        try {
            setLoading(true)
            const response = await menuService.getDishes();
            setDishes(response);
        } catch (error) {
            console.error("Error in fetchDishes", error)

            throw error
        } finally {
            setLoading(false)
        }
    }

    const fetchDishesByCategory = async (category: string) => {
        try {
            setLoading(true);
            const response = await menuService.getDishesByCategory(category);
            setDishes(response)
        } catch (error) {
            console.error("Error in fetchDishesByCategory", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {fetchDishes, dishes, loading, fetchDishesByCategory}
}