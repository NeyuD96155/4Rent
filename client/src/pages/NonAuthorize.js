import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NonAuthor.css";
export const NonAuthorize = () => {
    const navigate = useNavigate();
    return (
        <div className="non-authorize">
            <h1 className="non-authorize">
                Bạn không có quyền truy cập trang này
            </h1>
            <button className="non-authorize" onClick={() => navigate("/")}>
                Trở về trang chủ
            </button>
        </div>
    );
};
