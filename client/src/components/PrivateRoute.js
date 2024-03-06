// PrivateRoute.js

import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext ";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, userRole } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/dash-board" && userRole !== "ADMIN") {
            toast.warn("Chỉ ADMIN mới có quyền truy cập vào trang này.");
        }

        if (!isLoggedIn) {
            if (location.pathname === "/booking") {
                toast.info("Bạn cần đăng nhập để có thể booking.");
            }
        }
    }, [isLoggedIn, userRole, location.pathname]);

    if (!isLoggedIn) {
        return <Navigate to="/signin" replace />;
    } else if (location.pathname === "/dash-board" && userRole !== "ADMIN") {
        return <Navigate to="/access-denied" replace />;
    }

    return children;
};

export default PrivateRoute;
