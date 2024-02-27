import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null); // Changed to null for a more explicit initial value

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(Boolean(localStorage.getItem('token'))); // Changed variable name for clarity

    const signIn = (token, username) => { // Changed method name to signIn for consistency
        localStorage.setItem('token', token);
        localStorage.setItem('username', username); 
        setAuthenticated(true);
    
        const welcomeMessage = !localStorage.getItem('hasLoggedInBefore')
            ? `Welcome ${username} to our site` // Changed message to English for consistency
            : `Welcome back, ${username}`;
        
        sessionStorage.setItem('welcomeMessage', welcomeMessage);
        localStorage.setItem('hasLoggedInBefore', 'true');
    };

    const signOut = () => { // Changed method name to signOut for consistency
        localStorage.removeItem('token');
        setAuthenticated(false);
    };

    useEffect(() => {
        const handleStorageEvent = event => { // Renamed for clarity
            if (event.key === 'logout') {
                setAuthenticated(false);
            }
        };

        window.addEventListener('storage', handleStorageEvent);
        return () => window.removeEventListener('storage', handleStorageEvent);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
