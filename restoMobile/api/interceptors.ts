import { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setupInterceptors = (client: AxiosInstance) => {
    client.interceptors.request.use(
        async (config) => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        }
    )

    client.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                AsyncStorage.removeItem('token');
            }
            throw error;
        }
    )

}