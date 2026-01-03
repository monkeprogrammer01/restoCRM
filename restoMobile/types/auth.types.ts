export interface LoginRequest {
    phoneNumber: string,
    password: string
}

export interface RegistrationRequest {
    fullName: string,
    phoneNumber: string,
    password: string
}

export interface User {
    id: string,
    fullName: string,
    phoneNumber: string
}

export interface AuthResponse {
    token: string,
    user: User
}