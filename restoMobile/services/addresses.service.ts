import { api } from "@/api/client";

class AddressService {
    async createAddress(userId: string, city: string, street: string, building: string, apartment: string) {
        const response = await api.post("/api/address", {userId, city, street, building, apartment})
        return response.data;
    }
}

export const addressService = new AddressService();