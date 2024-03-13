import React from "react";
import { useNavigate } from "react-router-dom";
export const NonAuthorize = () => {
    const navigate = useNavigate();
    return (
        <div>
            <p>
                Bạn cần đăng kí dưới vai trò chủ sở hữu để có thể đăng bài
                timeshare
            </p>
            <button onClick={() => navigate("/")}>Trở về trang chủ</button>
            <br />
            <button onClick={() => navigate("/signup")}>
                Đăng kí member để có thể trở thành chủ sở hữu
            </button>
        </div>
    );
};
