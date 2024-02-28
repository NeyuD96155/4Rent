import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Sử dụng nếu bạn lưu trữ trạng thái đăng nhập/role trong Redux
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, userRole } = useSelector((state) => state.auth); // Lấy trạng thái từ Redux

    if (!isAuthenticated) {
        // Người dùng chưa đăng nhập, hiển thị thông báo và chuyển hướng đến trang đăng nhập
        toast.error("Bạn cần đăng nhập để truy cập trang này.");
        return toast.error;
    }

    // if (!allowedRoles.includes(userRole)) {
    //     // Người dùng không có quyền truy cập, hiển thị thông báo và chuyển hướng đến trang không có quyền
    //     toast.warn("Bạn không có quyền truy cập vào trang này.");
    //     return <Navigate to="/" />;
    // }

    return children; // Người dùng có quyền truy cập, render component
};

export default PrivateRoute;
