import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

    const login = (token, username, role) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("userRole", role);
        setUserRole(role);
        setIsLoggedIn(true);

        const welcomeMessage = !localStorage.getItem("hasLoggedInBefore")
            ? `Chào mừng ${username} đã đến với trang web`
            : `Chào mừng ${username} đã quay trở lại`;
        sessionStorage.setItem("welcomeMessage", welcomeMessage);
        localStorage.setItem("hasLoggedInBefore", "true");
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUserRole(null);
    };

    useEffect(() => {
        const syncLogout = (event) => {
            if (event.key === "logout") {
                setIsLoggedIn(false);
                setUserRole(null);
                localStorage.removeItem("username");
            }
        };

        window.addEventListener("storage", syncLogout);
        return () => window.removeEventListener("storage", syncLogout);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userRole }}>
            {children}
        </AuthContext.Provider>
    );
};
