import React from "react";

const CancellationPolicy = () => {
    return (
        <div className="container">
            <h1>Chính Sách Hủy Phòng</h1>
            <p>
                Tại 4Rent, chúng tôi hiểu rằng kế hoạch của bạn có thể thay đổi.
                Dưới đây là chính sách hủy phòng của chúng tôi để đảm bảo rằng
                quá trình này diễn ra suôn sẻ và công bằng cho tất cả các bên.
            </p>

            <h2>Hủy Trước Ngày Nhận Phòng</h2>
            <ul>
                <li>
                    Hủy ít nhất 3 ngày trước ngày nhận phòng: Hoàn lại toàn bộ
                    số tiền.
                </li>
                <li>
                    Hủy trong vòng 24 giờ trước ngày nhận phòng: Phí hủy là 50%
                    giá trị đặt phòng.
                </li>
            </ul>

            <h2>Hủy Sau Khi Nhận Phòng</h2>
            <p>
                Nếu bạn quyết định hủy sau khi đã nhận phòng, bạn có thể phải
                chịu phí tùy thuộc vào các điều khoản cụ thể của từng chỗ ở.
            </p>

            <h2>Lưu Ý</h2>
            <p>
                Chính sách hủy có thể khác nhau tùy thuộc vào từng loại hình chỗ
                ở và được liệt kê cụ thể trong mô tả của từng đơn vị.
            </p>

            {/* Add any additional information or sections as needed */}
        </div>
    );
};

export default CancellationPolicy;
