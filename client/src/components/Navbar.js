import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const NavigationBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const welcomeMessage = sessionStorage.getItem('welcomeMessage');
    if (isLoggedIn && welcomeMessage) {
      toast.success(welcomeMessage);
      sessionStorage.removeItem('welcomeMessage');
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const menu = (
    <Menu
      items={[
        {
          key: 'profile',
          icon: <UserOutlined />,
          label: <Link to="/profile">Profile</Link>, // Changed text for consistency
        },
        {
          key: 'history',
          icon: <HistoryOutlined />,
          label: <Link to="/history">Transaction History</Link>, // Changed text for consistency
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Logout', // Changed text for consistency
          onClick: handleLogout,
        },
      ]}
    />
  );

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">4Rent</Link>
      </div>
      <div className="links">
        <Link to="/post" className="link">Post Apartment</Link> // Changed text for consistency
        <Link to="/estate" className="link">Apartments</Link> // Changed text for consistency
        {isLoggedIn ? (
          <Dropdown overlay={menu}>
            <Avatar
              style={{ backgroundColor: '#87d068', cursor: 'pointer' }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        ) : (
          <>
            <Link to="/signin" className="link">Sign In</Link>
            <Link to="/signup" className="link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
