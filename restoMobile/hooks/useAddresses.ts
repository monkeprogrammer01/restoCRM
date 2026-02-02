import { useState } from "react";
import { useAuth } from "./useAuth"
import { addressService } from "@/services/addresses.service";

export const useAddresses = () => {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const addAddress = async (city: string, street: string, building: string, apartment: string) => {
        setLoading(true);
        try {
            addressService.createAddress()
        } catch (error) {
            
        }
    }
}