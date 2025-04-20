import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('token', token || '');
        setIsAuthenticated(!!token);
    }, [token]);

    const login = async (username, password) => {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.message || 'Login failed');
        }

        const data = await response.json();
        setToken(data.token);
        navigate('/');
    };

    const logout = () => {
        console.log('Logout')
        setToken(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};