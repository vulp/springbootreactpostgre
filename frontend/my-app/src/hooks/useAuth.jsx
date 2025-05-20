import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../utils/api';
import keycloak from '../services/keycloakService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        initialized: false,
        isAuthenticated: false,
        token: null,
        loginMethod: localStorage.getItem('loginMethod') || null,
        name:'',
        hsl:'',
        colorMode:'',
    });

    useEffect(() => {
        if (auth.loginMethod === 'custom-jwt' && auth.token) {
            localStorage.setItem('token', auth.token);
        } else {
            localStorage.removeItem('token');
        }
        localStorage.setItem('loginMethod', auth.loginMethod || '');
    }, [auth.token, auth.loginMethod]);

    useEffect(() => {
        const storedLoginMethod = localStorage.getItem('loginMethod');

        if (storedLoginMethod === 'keycloak') {
            initKeycloak();
        } else {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
             
                setAuth(prevAuth => ({
                    ...prevAuth,
                    initialized: true,
                    isAuthenticated: true,
                    token: storedToken,
                    loginMethod: 'custom-jwt',
                }));
            } else {
                setAuth(prevAuth => ({ ...prevAuth, initialized: true }));
            }
        }
    }, []);

    const setLoginMethod = useCallback((method) => {
        setAuth(prevAuth => ({ ...prevAuth, loginMethod: method }));
    }, [setAuth]);

    const initKeycloak = useCallback(() => {
        
        if (!keycloak.didInitialize) {
            keycloak.init({ onLoad: 'check-sso' })
                .then(authenticated => {
                    setAuth({
                        initialized: true,
                        isAuthenticated: authenticated,
                        token: keycloak.token,
                        loginMethod: 'keycloak',
                        name:keycloak.tokenParsed.name ? keycloak.tokenParsed.name : '',
                        hsl:keycloak.tokenParsed.hsl,
                        colorMode:keycloak.tokenParsed.colorMode,
                    });
                })
                .catch(error => {
                    console.error('Keycloak initialization error', error);
                    setAuth({ initialized: true, isAuthenticated: false, token: null, loginMethod: null });
                });
        }
    }, []);

    const loginWithKeycloak = useCallback(() => {
       
        if (!keycloak.didInitialize) {
            initKeycloak();
        }
        keycloak.login({redirectUri: window.location.origin + '/'});
    }, [keycloak]);

    const login = useCallback(async (username, password) => {
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Custom JWT Login failed');
            }

            const data = await response.json();
            setAuth({
                initialized: true,
                isAuthenticated: true,
                token: data.token,
                loginMethod: 'custom-jwt',
            });
            navigate('/');
        } catch (error) {
            console.error('Custom JWT Login error:', error);
            throw error;
        }
    }, [navigate]);

    const logout = useCallback(() => {
        if (auth.loginMethod === 'keycloak') {
            keycloak.logout();
        } else if (auth.loginMethod === 'custom-jwt') {
            setAuth({ ...auth, token: null, isAuthenticated: false, loginMethod: null });
            navigate('/login');
        }
    }, [auth.loginMethod, navigate]);

    const getToken = useCallback(() => auth.token, [auth.token]);

    const contextValue = {
        auth,
        loginWithKeycloak,
        login,
        logout,
        getToken,
        setLoginMethod,
        initKeycloak,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {!auth.initialized ? <div>Loading Authentication...</div> : children}  
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};