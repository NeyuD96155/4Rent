import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Logout = () => {
    const navigate = useNavigate();
    const { setAuthState } = useContext(AuthContext);

    useEffect(() => {
        const performLogout = () => {
            localStorage.removeItem("token");

            setAuthState(null);

            toast.success("Đăng xuất thành công!");

            navigate("/signin");
        };

        performLogout();
    }, [navigate, setAuthState]);

    return null;
};

export default Logout;
