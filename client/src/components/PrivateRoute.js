import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext ";
import { toast } from "react-toastify";
//note các phân quyền cần thiết: 
// estateform: member
// userestate: member
// showestate: member, renter, guest, admin
// dashboard: admin
// booking : renter


const PrivateRoute = ({ children }) => {

    const { userRole } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (
            userRole !== "MEMBER" &&
            userRole !== "ADMIN" &&
            userRole !== "RENTER" &&
            location.pathname.startsWith("/booking/")
        ) {
            toast.info("Bạn cần đăng nhập để có thể đặt phòng.");
        }
        if (location.pathname === "/dash-board" && userRole !== "ADMIN") {
            toast.warn("Chỉ ADMIN mới có quyền truy cập vào trang này.");
        }
        if (
            (location.pathname === "/estate-form" ||
                location.pathname === "/users-estate") &&
            userRole !== "MEMBER"
        ) {
            toast.warn("Chỉ MEMBER mới có quyền truy cập vào trang này.");
        }
    }, [userRole, location.pathname]);

    if (location.pathname === "/dash-board" && userRole !== "ADMIN") {
        return <Navigate to="/access-denied" replace />;
    } else if (
        (location.pathname === "/estate-form" ||
            location.pathname === "/users-estate") &&
        userRole !== "MEMBER"
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
    return children;
};

export default PrivateRoute;
