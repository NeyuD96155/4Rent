import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Menu, Dropdown } from "antd";
import {
    UserOutlined,
    HistoryOutlined,
    LogoutOutlined,
    WalletOutlined,
} from "@ant-design/icons";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext ";
import { toast } from "react-toastify";

const NavigationBar = () => {
    const { isLoggedIn, userRole, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const welcomeMessage = sessionStorage.getItem("welcomeMessage");
        if (isLoggedIn && welcomeMessage) {
            toast.success(welcomeMessage);
            sessionStorage.removeItem("welcomeMessage");
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        logout();
        localStorage.setItem("logout", Date.now());
        navigate("/signin");
    };

    const menu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link to="/profile">Xem Thông Tin Cá Nhân</Link>
            </Menu.Item>
            <Menu.Item key="wallet" icon={<WalletOutlined />}>
                <Link to="/wallet">Ví Của Bạn</Link>
            </Menu.Item>
            <Menu.Item key="history" icon={<HistoryOutlined />}>
                <Link to="/booking-history">Xem Lịch Sử Giao Dịch</Link>
            </Menu.Item>
            <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
            >
                Đăng Xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <nav className="navbar-container">
            <div className="navbar-logo">
                <Link to="/">4Rent</Link>
            </div>
            <div className="navbar-links">
                <Link to="/show-estate" className="navbar-link">
                    Xem căn hộ
                </Link>
                {isLoggedIn &&
                    userRole !== "ADMIN" &&
                    userRole !== "RENTER" && (
                        <Link to="/users-estate" className="navbar-link">
                            Căn hộ của bạn
                        </Link>
                    )}
                {isLoggedIn &&
                    userRole !== "ADMIN" &&
                    userRole !== "RENTER" && (
                        <Link to="/estate-form" className="navbar-link">
                            Đăng căn hộ
                        </Link>
                    )}
                {isLoggedIn && userRole === "ADMIN" && (
                    <Link to="/dash-board" className="navbar-link">
                        DashBoard
                    </Link>
                )}

                {isLoggedIn ? (
                    <Dropdown overlay={menu} placement="bottomRight">
                        <a
                            onClick={(e) => e.preventDefault()}
                            className="avatar-link"
                        >
                            <Avatar
                                style={{ backgroundColor: "#87d068" }}
                                icon={<UserOutlined />}
                            />
                        </a>
                    </Dropdown>
                ) : (
                    <>
                        <Link to="/signin" className="navbar-link">
                            Đăng Nhập
                        </Link>
                        <Link to="/signup" className="navbar-link">
                            Đăng Kí
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavigationBar;
