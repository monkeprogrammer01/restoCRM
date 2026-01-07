import { api } from "@/api/client";
import { User } from "@/types/auth.types";
class UserService {
    async getProfile(): Promise<User> {
        const response = await api.get("/auth/profile")
        return response.data
    }
}

export const userService = new UserService();