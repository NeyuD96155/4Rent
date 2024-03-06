// Insurance.js
import React from "react";
import "../styles/Insurance.css";

const Insurance = () => {
    return (
        <div className="insurance-container">
            <h2>Thông Tin Bảo Hành Cho Thuê Bất Động Sản</h2>
            <p>
                Bảo hành cho thuê bất động sản là một phần quan trọng trong việc
                bảo vệ tài sản của bạn và giảm thiểu rủi ro trong quá trình cho
                thuê.
            </p>
            <div className="insurance-details">
                <div className="insurance-item">
                    <h3>Loại Bảo Hành</h3>
                    <p>Bảo Hành Pháp Lý</p>
                </div>
                <div className="insurance-item">
                    <h3>Thời Hạn Bảo Hành</h3>
                    <p>Trong thời gian thuê kỳ nghỉ</p>
                </div>
                <div className="insurance-item">
                    <h3>Phạm Vi Bảo Hành</h3>
                    <p>
                        Bảo hành bao gồm bất kỳ tranh chấp pháp lý nào liên quan
                        đến quyền sở hữu, tiêu chuẩn chất lượng, hoặc vi phạm
                        hợp đồng.
                    </p>
                </div>
                <div className="insurance-item">
                    <h3>Nhà Cung Cấp</h3>
                    <p>Công Ty Bảo Hiểm Vạn Năm</p>
                </div>
            </div>
        </div>
    );
};

export default Insurance;
