import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from '../services/auth.service'
import { User, RegistrationRequest } from '../types/auth.types'


export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const login = async (phoneNumber: string, password: string) => {
        try {
            setLoading(true)
            const response = await authService.login(phoneNumber, password);
            await AsyncStorage.setItem("token", response.token)
            await AsyncStorage.setItem("user", JSON.stringify(response.user))
            setUser(response.user)
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const register = async (data: RegistrationRequest) => {
        try {
            setLoading(true)
            const response = await authService.register(data)
            await AsyncStorage.setItem("token", response.token);
            await AsyncStorage.setItem("user", JSON.stringify(response.user))
            setUser(response.user)
        } catch (error) {
            throw error;
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    return { user, loading, login, register, logout }; 

}