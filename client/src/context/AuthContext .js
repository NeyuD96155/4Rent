import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
    const [isProfileUpdated, setIsProfileUpdated] = useState(localStorage.getItem("profileUpdated") === "true");

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
        localStorage.setItem("logout", Date.now().toString());
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("username");
        localStorage.removeItem("profileUpdated"); // Đảm bảo xóa trạng thái cập nhật hồ sơ khi đăng xuất

        setIsLoggedIn(false);
        setUserRole(null);
        setIsProfileUpdated(false); // Cập nhật trạng thái hồ sơ khi đăng xuất
    };

    // Phương thức để cập nhật trạng thái cập nhật hồ sơ của người dùng
    const updateProfileStatus = (updated) => {
        setIsProfileUpdated(updated);
        localStorage.setItem("profileUpdated", updated.toString());
    };

    useEffect(() => {
        const syncLogout = (event) => {
            if (event.key === "logout") {
                setIsLoggedIn(false);
                setUserRole(null);
                setIsProfileUpdated(false); // Đảm bảo cập nhật trạng thái khi đồng bộ đăng xuất
                localStorage.removeItem("username");
                localStorage.removeItem("profileUpdated");
            }
        };

        window.addEventListener("storage", syncLogout);
        return () => window.removeEventListener("storage", syncLogout);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userRole, isProfileUpdated, updateProfileStatus }}>
            {children}
        </AuthContext.Provider>
    );
};
