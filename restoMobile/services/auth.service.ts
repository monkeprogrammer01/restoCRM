import { api } from "@/api/client";
import { LoginRequest, RegistrationRequest, AuthResponse } from "@/types/auth.types";

class AuthService {
    async login(phoneNumber: string, password: string): Promise<AuthResponse> {
        const response = await api.post('/auth/login', {
            phoneNumber, password
        })
        return response.data        
    }

    async signup(fullName: string, phoneNumber: string, password: string): Promise<AuthResponse> {
        const response = await api.post('/auth/signup', {
            fullName, phoneNumber, password
        })
        return response.data
    }

    // async me(): Promise<AuthResponse> {
    //     const response = await api.get('/auth/me')
    //     return response.data
    // }

}