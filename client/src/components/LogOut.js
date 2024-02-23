import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext '; // Adjust the import path as necessary
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext); // Use your AuthContext

  useEffect(() => {
    const performLogout = () => {
      // Clear any auth tokens or user details from storage
      localStorage.removeItem('token');

      // Update the global auth state to indicate the user is logged out
      setAuthState(null);

      // Optionally show a success message
      toast.success('Đăng xuất thành công!');

      // Redirect the user to the login page or home page
      navigate('/signin');
    };

    performLogout();
  }, [navigate, setAuthState]);

  return null; // This component doesn't need to render anything
};

export default Logout;
