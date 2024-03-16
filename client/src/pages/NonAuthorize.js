import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NonAuthor.css";
export const NonAuthorize = () => {
    const navigate = useNavigate();
    return (
        <div className="non-authorize">
            <p className="non-authorize">
                Bạn cần đăng kí dưới vai trò chủ sở hữu để có thể đăng bài
                timeshare
            </p>
            <button className="non-authorize" onClick={() => navigate("/")}>
                Trở về trang chủ
            </button>
            <br />
            <button
                className="non-authorize"
                onClick={() => navigate("/signup")}
            >
                Đăng kí member để có thể trở thành chủ sở hữu
            </button>
        </div>
    );
};
