// PrivateRoute.js

import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext ";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
    const { userRole } = useAuth();
    const location = useLocation();

    useEffect(() => {
        // Notify users based on their authentication status and role
        if (
            userRole !== "MEMBER" &&
            userRole !== "ADMIN" &&
            userRole !== "RENTER" &&
            location.pathname.startsWith("/booking/")
        ) {
            toast.info("Bạn cần đăng nhập để có thể đặt phòng.");
        }
        if (location.pathname === "/dash-board" && userRole !== "ADMIN") {
            // Redirecting to access-denied if not ADMIN
            toast.warn("Chỉ ADMIN mới có quyền truy cập vào trang này.");
        }
        if (
            (location.pathname === "/estate-form" ||
                location.pathname === "/users-estate") &&
            userRole !== "MEMBER" &&
            userRole !== "ADMIN"
        ) {
            // Redirecting to non-authorize if not MEMBER for estate-related paths
            toast.warn("Chỉ MEMBER mới có thể đăng và sở hữu estate.");
        }
    }, [userRole, location.pathname]);

    // Redirect conditions based on role and path
    if (location.pathname === "/dash-board" && userRole !== "ADMIN") {
        return <Navigate to="/access-denied" replace />;
    } else if (
        (location.pathname === "/estate-form" ||
            location.pathname === "/users-estate") &&
        (userRole !== "MEMBER" &&
        userRole !== "ADMIN")
    ) {
        return <Navigate to="/non-authorize" replace />;
    } else if (
        userRole !== "MEMBER" &&
        userRole !== "ADMIN" &&
        userRole !== "RENTER" &&
        location.pathname.startsWith("/booking/")
    ) {
        return <Navigate to="/signin" replace />;
    }

    // If none of the conditions above are met, render the children components (authorized access)
    return children;
};

export default PrivateRoute;
