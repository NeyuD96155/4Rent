import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined, HistoryOutlined, LogoutOutlined, HomeOutlined, UploadOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const NavigationBar = () => {
  const { isAuthenticated, signOut, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const welcomeMessage = sessionStorage.getItem('welcomeMessage');
    if (isAuthenticated && welcomeMessage) {
      toast.success(welcomeMessage);
      sessionStorage.removeItem('welcomeMessage');
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    signOut();
    toast.info('You have been logged out.');
    navigate('/signin');
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="history" icon={<HistoryOutlined />}>
        <Link to="/history">Transaction History</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/"><HomeOutlined /> 4Rent</Link>
      </div>
      <div className="navbar__links">
        <Link to="/post" className="navbar__link"><UploadOutlined /> Post Apartment</Link>
        <Link to="/estate" className="navbar__link"><HomeOutlined /> Apartments</Link>
        {isAuthenticated ? (
          <Dropdown overlay={menu} className="navbar__user-dropdown">
            <a onClick={e => e.preventDefault()}>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              <span className="navbar__username">{user?.name || 'User'}</span>
            </a>
          </Dropdown>
        ) : (
          <>
            <Link to="/signin" className="navbar__link"><LoginOutlined /> Sign In</Link>
            <Link to="/signup" className="navbar__link"><UserAddOutlined /> Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
