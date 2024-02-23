import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Menu, Dropdown } from "antd";
import {
    UserOutlined,
    HistoryOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import "../styles/Navbar.css";

const NavigationBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in by looking for a token in local storage
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        // Remove the token from local storage to log the user out
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/signin"); // Redirect the user to the sign-in page
    };

    // Define the menu for Dropdown using 'menu' prop
    const userDropdownMenu = (
        <Menu
            items={[
                {
                    key: "profile",
                    icon: <UserOutlined />,
                    label: <Link to="/profile">View Profile</Link>,
                },
                {
                    key: "history",
                    icon: <HistoryOutlined />,
                    label: <Link to="/history">History</Link>,
                },
                {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "Logout",
                    onClick: handleLogout,
                },
            ]}
        />
    );

    return (
        <nav className="navbar-container">
            <div className="navbar-logo">
                <Link to="/">4Rent</Link>
            </div>
            <div className="navbar-links">
                <Link to="/post" className="navbar-link">
                    Đăng căn hộ
                </Link>
                <Link to="/profile" className="navbar-link">
                    Profile
                </Link>
                {isLoggedIn ? (
                    <Dropdown menu={userDropdownMenu}>
                        <a onClick={(e) => e.preventDefault()}>
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
