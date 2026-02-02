import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            // response.data = { token, id, email, roles: [] }
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                const userData = {
                    id: response.data.id,
                    email: response.data.email,
                    roles: response.data.roles
                };
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData) => {
        return authService.register(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
