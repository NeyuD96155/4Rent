import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const NavigationBar = () => {
  const { isAuthenticated, signOut } = useAuth(); // Adjusted to use isAuthenticated and signOut
  const navigate = useNavigate();

  useEffect(() => {
    const welcomeMessage = sessionStorage.getItem('welcomeMessage');
    if (isAuthenticated && welcomeMessage) { // Adjusted to use isAuthenticated
      toast.success(welcomeMessage);
      sessionStorage.removeItem('welcomeMessage');
    }
  }, [isAuthenticated]); // Adjusted to use isAuthenticated

  const handleLogout = () => {
    signOut(); // Adjusted to use signOut
    navigate('/signin');
  };

  const menu = (
    <Menu
      items={[
        {
          key: 'profile',
          icon: <UserOutlined />,
          label: <Link to="/profile">Profile</Link>,
        },
        {
          key: 'history',
          icon: <HistoryOutlined />,
          label: <Link to="/history">Transaction History</Link>,
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Logout',
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
      <div className="navigation-links">
        <Link to="/post" className="nav-link">Post Apartment</Link>
        <Link to="/estate" className="nav-link">Apartments</Link>
        {isAuthenticated ? ( // Adjusted to use isAuthenticated
          <Dropdown overlay={menu} className="user-dropdown">
            <Avatar
              style={{ backgroundColor: '#87d068', cursor: 'pointer' }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        ) : (
          <>
            <Link to="/signin" className="nav-link">Sign In</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
