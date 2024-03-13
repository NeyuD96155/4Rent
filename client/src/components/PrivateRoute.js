// PrivateRoute.js

import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext ';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children }) => {
    const [countdown, setCountdown] = useState(3);
    const { isLoggedIn, userRole } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams(); // Get the dynamic segment id

    useEffect(() => {
        let interval;

        if (!isLoggedIn && location.pathname.startsWith('/booking/')) {
            // Alert the user they need to sign in to access booking and start a countdown
            toast.info('Bạn cần đăng nhập để có thể booking. Quay lại trang đăng nhập sau 3 giây đếm ngược');
            interval = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        // If countdown finishes, clear the interval and redirect to sign-in page
                        clearInterval(interval);
                        navigate('/signin');
                        return 0;
                    }
                    // Otherwise, decrement the countdown
                    return prevCountdown - 1;
                });
            }, 1000); // Update every second
        } else if (isLoggedIn && location.pathname === '/dash-board' && userRole !== 'ADMIN') {
            // Warn non-ADMIN users when they try to access the dashboard.
            toast.warn('Chỉ ADMIN mới có quyền truy cập vào trang này.');
        }

        // Clean up the interval on component unmount
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isLoggedIn, userRole, location.pathname, navigate]);

    if (!isLoggedIn && location.pathname.startsWith('/booking/')) {
        // Display countdown message while waiting to redirect
        return <div>Bạn cần đăng nhập để có thể booking. Quay lại trang đăng nhập sau {countdown} giây đếm ngược.</div>;
    }

    if (isLoggedIn && location.pathname === '/dash-board' && userRole !== 'ADMIN') {
        return <Navigate to="/access-denied" replace />;
    }

    return children;
};

export default PrivateRoute;
