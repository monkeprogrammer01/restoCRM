import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from '../services/auth.service'
import { User, RegistrationRequest } from '../types/auth.types'
import { useRouter } from "expo-router";
import { userService } from "@/services/user.service";

export const useAuth = () => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const fetchProfile = async () => {
        try {
            setLoading(true)
            const response = await userService.getProfile()
            setUser(response.user)
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    const checkAuth = async () => {
        try {
          
          const token = await AsyncStorage.getItem('token');
          const savedUser = await AsyncStorage.getItem('user');
      
          if (!token || !savedUser || savedUser === 'undefined') {
            setUser(null);
            return;
          }
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        } catch (error) {
          console.log('Ошибка проверки авторизации:', error);
          setUser(null);
        } finally {
          setIsInitialized(true);
        }
      };
      

    const login = async (phoneNumber: string, password: string) => {
        try {
            setLoading(true)
            const response = await authService.login(phoneNumber, password);
            setUser(response.user)

            await AsyncStorage.setItem("token", response.token)
            await AsyncStorage.setItem("user", JSON.stringify(response.user))
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
            setLoading(true)
            await AsyncStorage.multiRemove(["token", "user"]);
            await AsyncStorage.clear();

            setUser(null);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    };
    return { user, loading, login, register, logout, checkAuth, isInitialized, fetchProfile }; 

}