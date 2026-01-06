import { useState } from "react";
import { userService } from "@/services/user.service";
import { User } from "@/types/auth.types";

export const useUser = () => {
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchProfile = async () => {
        try {
            setLoading(true)
            const response = await userService.getProfile()
            setProfile(response)
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }
    return {profile, loading, fetchProfile}
}