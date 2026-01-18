import { useState, useCallback } from "react"
import { menuService } from "@/services/menu.service";
import { Category, Dish } from "@/types/menu.types";
export const useMenu = () => {
    const [loading, setLoading] = useState(false);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const fetchDishes = useCallback(async () => {
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

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            const response = await menuService.getCategories();
            console.log(response)
            setCategories(response);
        } catch (error) {
            console.log("Error in fetchCategories (useMenu).", error)
        } finally {
            setLoading(false)
        }
    }, [])

    return {fetchDishes, dishes, loading, fetchDishesByCategory, fetchCategories, categories}
}