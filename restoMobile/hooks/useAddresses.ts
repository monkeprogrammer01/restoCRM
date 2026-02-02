import { useState, useEffect } from "react";
import { useAuth } from "./useAuth"
import { addressService } from "@/services/addresses.service";
import { Address } from "@/types/address.types";
export const useAddresses = () => {

    const { user, fetchProfile } = useAuth();

    useEffect(() => {
        if (!user) {
            fetchProfile();
        }
    }, [user, fetchProfile]);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(false);
    const addAddress = async (city: string, street: string, building: string, apartment: string) => {

        try {
            setLoading(true);
            const newAddress = await addressService.createAddress(user.id, city, street, building, apartment);
            setAddresses((prev) => [...prev, newAddress]);
            return newAddress
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }
    // useEffect(() => {
    //     fetchAddresses();
    // }, [user?.id]);
    return {addAddress, addresses}
}