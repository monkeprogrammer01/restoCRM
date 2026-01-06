import { api } from "@/api/client";
import { LoginRequest, RegistrationRequest, AuthResponse, User } from "@/types/auth.types";

class AuthService {
    async login(phoneNumber: string, password: string): Promise<AuthResponse> {
        const response = await api.post('/auth/login', {
            phoneNumber, password
        })
        return response.data        
    }

    async register(user: RegistrationRequest): Promise<AuthResponse> {
        console.log("fejk", user)
        const response = await api.post('/auth/signup', {
            fullName: user.fullName, phoneNumber: user.phoneNumber, password: user.password
        })
        return response.data
    }

    async me(): Promise<AuthResponse> {
        const response = await api.get('/auth/me')
        return response.data
    }

}

export const authService = new AuthService();