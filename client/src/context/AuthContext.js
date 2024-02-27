import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(Boolean(localStorage.getItem('token')));
    const [user, setUser] = useState({ name: localStorage.getItem('username') });

    const signIn = (token, username) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setAuthenticated(true);
        setUser({ name: username });

        const welcomeMessage = !localStorage.getItem('hasLoggedInBefore')
            ? `Welcome ${username} to our site`
            : `Welcome back, ${username}`;

        sessionStorage.setItem('welcomeMessage', welcomeMessage);
        localStorage.setItem('hasLoggedInBefore', 'true');
    };

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setAuthenticated(false);
        setUser(null);
    };

    useEffect(() => {
        const handleStorageEvent = event => {
            if (event.key === 'logout') {
                setAuthenticated(false);
                setUser(null);
            }
        };

        window.addEventListener('storage', handleStorageEvent);
        return () => window.removeEventListener('storage', handleStorageEvent);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, user }}>
            {children}
        </AuthContext.Provider>
    );
};
