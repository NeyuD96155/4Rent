// PrivateRoute.js

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext ';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, userRole } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            toast.error("Bạn cần đăng nhập để truy cập trang này.");
        } else if (userRole !== 'ADMIN') {
            toast.warn("Bạn không có quyền truy cập vào trang này.");
        }
    }, [isLoggedIn, userRole]);

    if (!isLoggedIn) {
        // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
        return <Navigate to="/login" replace />;
    } else if (userRole !== 'ADMIN') {
        // Nếu người dùng không phải là admin, chuyển hướng đến trang AccessDeniedPage
        return <Navigate to="/access-denied" replace />;
    }

    // Nếu người dùng đã đăng nhập và là admin, render component children
    return children;
};

export default PrivateRoute;
