import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [email, setEmail] = useState(() => localStorage.getItem('email') || '');
    const [isAuthenticated, setIsAuthenticated] = useState(() => JSON.parse(localStorage.getItem('isAuthenticated')) || false);

    useEffect(() => {
        localStorage.setItem('email', email);
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    }, [email, isAuthenticated]);

    const logout = () => {
        setEmail('');
        setIsAuthenticated(false);
        localStorage.removeItem('email');
        localStorage.removeItem('isAuthenticated');
    };

    return (
        <AuthContext.Provider value={{ email, setEmail, isAuthenticated, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
