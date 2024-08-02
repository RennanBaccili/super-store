import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { UserDTO } from "../models/Dto/UserDTO";
import { setCookie, parseCookies } from "nookies";
import { User } from "../models/User";
import { api } from "../config";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (userDTO: UserDTO) => Promise<void>;
    register: (userDTO: UserDTO) => Promise<void>;
    getUserFromLocalStorage: () => User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const { 'shopchat.token': token } = parseCookies();
        
        if (token) {
            const storedUser = localStorage.getItem('shopchat.user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                const decodedToken = jwtDecode<User>(token);
                const newUser = new User(decodedToken._id, decodedToken.username, decodedToken.email, decodedToken.roles);
                setUser(newUser);
                localStorage.setItem('shopchat.user', JSON.stringify(newUser));
            }

            api.defaults.headers['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    const signIn = useCallback(async (userDTO: UserDTO) => {
        try {
            const response = await api.post(`/auth/login`, {
                username: userDTO.username,
                password: userDTO.password,
                email: userDTO.email
            });

            const { data } = response;
            if (data.access_token) {
                setCookie(null, 'shopchat.token', data.access_token, {
                    maxAge: 60 * 60 * 10, // 10 hours
                });

                api.defaults.headers['Authorization'] = `Bearer ${data.access_token}`;

                const decodedToken = jwtDecode<User>(data.access_token);
                const newUser = new User(decodedToken._id, decodedToken.username, decodedToken.email, decodedToken.roles);
                setUser(newUser);
                console.log(newUser);
                localStorage.setItem('shopchat.user', JSON.stringify(newUser));
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }, []);

    const register = useCallback(async (userDTO: UserDTO) => {
        try {
            const response = await api.post(`/auth/register`, {
                username: userDTO.username,
                password: userDTO.password,
                email: userDTO.email
            });

            const { data } = response;
            if (data.access_token) {
                setCookie(null, 'shopchat.token', data.access_token, {
                    maxAge: 60 * 60 * 10,
                });
                
                api.defaults.headers['Authorization'] = `Bearer ${data.access_token}`;

                const decodedToken = jwtDecode<User>(data.access_token);
                const newUser = new User(decodedToken._id, decodedToken.username, decodedToken.email, decodedToken.roles);
                setUser(newUser);
                localStorage.setItem('shopchat.user', JSON.stringify(newUser));
            }
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    }, []);

    const isAuthenticated = user != null;

    const getUserFromLocalStorage = () => {
        const storedUser = localStorage.getItem('shopchat.user');
        return storedUser ? JSON.parse(storedUser) : null;
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, register, getUserFromLocalStorage }}>
            {children}
        </AuthContext.Provider>
    );
}