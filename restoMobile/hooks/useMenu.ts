import { useState, useCallback } from "react"
import { menuService } from "@/services/menu.service";
import { Dish } from "@/types/menu.types";
export const useMenu = () => {
    const [loading, setLoading] = useState(false);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const fetchDishes = useCallback(async () => {
        try {
            setLoading(true)
            console.log("request poshel")
            const response = await menuService.getDishes();
            console.log("request over")
            setDishes(response);
        } catch (error) {
            console.error("Error in fetchDishes", error)

            throw error
        } finally {
            setLoading(false)
        }
    }, [])

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