import React from "react";
import { Link } from "react-router-dom";
import "../styles/Policy.css";

const Policy = () => {
    return (
        <div className="cancellation-policy-container">
            <h1 className="policy-heading">Chính sách Bảo mật</h1>
            <p className="policy-content">
                <strong>Thu thập thông tin cá nhân:</strong> Chúng tôi có thể
                thu thập thông tin cá nhân từ người dùng khi họ đăng ký trên
                trang web của chúng tôi hoặc khi họ thực hiện giao dịch trên
                trang web. Thông tin cá nhân có thể bao gồm tên, địa chỉ email,
                địa chỉ, số điện thoại và thông tin thanh toán.
            </p>
            <p className="policy-content">
                <strong>Sử dụng thông tin:</strong> Thông tin cá nhân thu thập
                được có thể được sử dụng để: Cung cấp và quản lý dịch vụ của
                chúng tôi. Tùy chỉnh trải nghiệm người dùng và cung cấp nội dung
                và quảng cáo cá nhân hóa. Liên lạc với người dùng, bao gồm thông
                tin về tài khoản và cập nhật về dịch vụ. Xác định và ngăn chặn
                hoạt động gian lận và truy cứu trách nhiệm pháp lý nếu cần.
            </p>
            <p className="policy-content">
                <strong>Bảo mật:</strong> Chúng tôi cam kết bảo vệ thông tin cá
                nhân của bạn và sử dụng các biện pháp bảo mật thích hợp để bảo
                vệ chúng khỏi truy cập trái phép hoặc tiêu cực.
            </p>

            <h1 className="policy-heading">Chính sách Sử dụng</h1>
            <p className="policy-content">
                <strong>Điều khoản và điều kiện:</strong> Việc sử dụng trang web
                của chúng tôi đồng nghĩa với việc bạn chấp nhận các điều khoản
                và điều kiện của chúng tôi. Hãy đọc kỹ và hiểu rõ trước khi tiếp
                tục sử dụng.
            </p>
            <p className="policy-content">
                <strong>Quyền sở hữu trí tuệ:</strong> Tất cả nội dung trên
                trang web này, bao gồm nhưng không giới hạn vào văn bản, hình
                ảnh, video, biểu đồ và biểu mẫu, là tài sản của 4Rent và được
                bảo vệ bởi bản quyền.
            </p>
            <Link to="/cancellation-policy" className="policy-link">
                Chính sách Hủy Phòng
            </Link>
        </div>
    );
};

export default Policy;
