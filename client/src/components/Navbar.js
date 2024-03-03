import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Menu, Dropdown } from "antd";
import {
    UserOutlined,
    HistoryOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext ";
import { toast } from "react-toastify";

const NavigationBar = () => {
    const { isLoggedIn, userRole, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra và hiển thị thông báo chào mừng
        const welcomeMessage = sessionStorage.getItem("welcomeMessage");
        if (isLoggedIn && welcomeMessage) {
            toast.success(welcomeMessage);
            sessionStorage.removeItem("welcomeMessage");
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        logout();
        // Gửi sự kiện logout đến các tab khác
        localStorage.setItem('logout', Date.now());
        navigate("/signin");
    };

    const menu = (
        <Menu items={[
            {
                key: "profile",
                icon: <UserOutlined />,
                label: <Link to="/profile">Xem Thông Tin Cá Nhân</Link>,
            },
            {
                key: "history",
                icon: <HistoryOutlined />,
                label: <Link to="/booking-history">Xem Lịch Sử Giao Dịch</Link>,
            },
            {
                key: "logout",
                icon: <LogoutOutlined />,
                label: "Đăng Xuất",
                onClick: handleLogout,
            },
        ]} />
    );

    return (
        <nav className="navbar-container">
            <div className="navbar-logo">
                <Link to="/">4Rent</Link>
            </div>
            <div className="navbar-links">
                <Link to="/estate" className="navbar-link">Căn hộ</Link>
                {isLoggedIn && userRole === 'ADMIN' && (
                    <Link to="/dash-board" className="navbar-link">DashBoard</Link>
                )}
                {isLoggedIn && (userRole === 'MEMBER' || userRole === 'ADMIN') && (
                    <Link to="/post" className="navbar-link">Đăng căn hộ</Link>
                )}
                {isLoggedIn ? (
                    <Dropdown overlay={menu}>
                        <a onClick={e => e.preventDefault()} className="avatar-link">
                            <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
                        </a>
                    </Dropdown>
                ) : (
                    <>
                        <Link to="/signin" className="navbar-link">Đăng Nhập</Link>
                        <Link to="/signup" className="navbar-link">Đăng Kí</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavigationBar;
