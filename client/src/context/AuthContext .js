import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const login = (token, username) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username); // Đảm bảo lưu tên người dùng
        setIsLoggedIn(true);
    
        // Đặt thông báo chào mừng trong sessionStorage
        if (!localStorage.getItem('hasLoggedInBefore')) {
            sessionStorage.setItem('welcomeMessage', `Chào mừng ${username} đã đến với trang web`);
            localStorage.setItem('hasLoggedInBefore', 'true');
        } else {
            sessionStorage.setItem('welcomeMessage', `Chào mừng ${username} đã quay trở lại`);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    // Cập nhật trạng thái isLoggedIn dựa vào sự thay đổi của localStorage
    useEffect(() => {
        const syncLogout = (event) => {
            if (event.key === 'logout') {
                setIsLoggedIn(false);
            }
        };

        window.addEventListener('storage', syncLogout);
        return () => {
            window.removeEventListener('storage', syncLogout);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
