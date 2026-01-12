import { api } from "@/api/client";
import { Dish } from "@/types/menu.types";

class MenuService {
    async getDishes(): Promise<Dish[]> {
        const response = await api.get("/menu");
        console.log("rr", response)
        return response.data
    }

    async getDishesByCategory(category: string): Promise<Dish[]> {
        const response = await api.get(`/menu`, {params: { category }})
        return response.data;
    } 
}
export const menuService = new MenuService();