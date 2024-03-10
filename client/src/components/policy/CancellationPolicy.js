import React from "react";
import "../../styles/CancellationPolicy.css"; 

const CancellationPolicy = () => {
    return (
        <div className="cancellation-policy-container">
            <h1>Chính Sách Hủy Phòng</h1>
            <p>
                Tại 4Rent, chúng tôi hiểu rằng kế hoạch của bạn có thể thay đổi.
                Dưới đây là chính sách hủy phòng của chúng tôi để đảm bảo rằng
                quá trình này diễn ra suôn sẻ và công bằng cho tất cả các bên.
            </p>
            <ol>
                <li>
                    <strong>Chính Sách Hủy Độc Lập:</strong> Mỗi chủ timeshare
                    có thể thiết lập chính sách hủy độc lập của riêng mình. Hãy
                    kiểm tra chính sách cụ thể của mỗi tài sản trước khi đặt
                    phòng.
                </li>
                <li>
                    <strong>Chính Sách Hủy Theo Thời Gian:</strong> Nếu bạn hủy
                    phòng sau một khoảng thời gian nhất định trước ngày nhận
                    phòng, có thể sẽ áp dụng phí hủy phòng. Hãy đảm bảo đọc và
                    hiểu rõ các điều khoản và điều kiện của chính sách này trước
                    khi đặt phòng.
                </li>
                <li>
                    <strong>Chính Sách Hủy Linh Hoạt:</strong> 4Rent cung cấp
                    các tùy chọn hủy linh hoạt cho một số đặc điểm đặc biệt của
                    các tài sản. Điều này có thể bao gồm việc cung cấp các chính
                    sách hủy miễn phí hoặc hủy linh hoạt trong một khoảng thời
                    gian nhất định trước ngày nhận phòng.
                </li>
            </ol>
            <p>
                Trước khi đặt phòng, hãy đảm bảo bạn đã đọc và hiểu rõ các điều
                khoản và điều kiện của chính sách hủy phòng. Nếu bạn có bất kỳ
                câu hỏi nào, hãy liên hệ với chúng tôi để được hỗ trợ.
            </p>

            <h2>Hủy Trước Ngày Nhận Phòng</h2>
            <ul>
                <li>
                    <strong>Hủy ít nhất 3 ngày trước ngày nhận phòng:</strong>{" "}
                    Nếu bạn hủy ít nhất 3 ngày trước ngày nhận phòng, bạn sẽ
                    được hoàn lại toàn bộ số tiền đã thanh toán cho đặt phòng.
                </li>
                <li>
                    <strong>
                        Hủy trong vòng 24 giờ trước ngày nhận phòng:
                    </strong>{" "}
                    Nếu bạn hủy trong vòng 24 giờ trước ngày nhận phòng, một
                    khoản phí hủy bằng 70% giá trị đặt phòng sẽ được áp dụng và
                    số tiền còn lại sẽ được hoàn lại cho bạn.
                </li>
            </ul>
            <p>
                Đảm bảo bạn đọc và hiểu rõ các điều khoản và điều kiện của chính
                sách hủy phòng trước khi đặt phòng. Hãy xem xét kế hoạch của bạn
                một cách cẩn thận để tránh phí hủy không mong muốn.
            </p>

            <h2>Hủy Sau Khi Nhận Phòng</h2>
            <p>
                Nếu bạn quyết định hủy sau khi đã nhận phòng, bạn có thể phải
                chịu phí hủy tùy thuộc vào các điều khoản cụ thể của từng chỗ ở.
                Thông thường, các chỗ ở có thể yêu cầu thanh toán một phần hoặc
                toàn bộ số tiền cho số đêm lưu trú chưa sử dụng cũng như một
                khoản phí xử lý.
            </p>

            <h2>Lưu Ý</h2>
            <p>
                Chính sách hủy có thể khác nhau tùy thuộc vào từng loại hình chỗ
                ở và được liệt kê cụ thể trong mô tả của từng đơn vị. Trước khi
                đặt phòng, hãy đảm bảo bạn đã đọc và hiểu rõ các điều khoản và
                điều kiện, đặc biệt là về chính sách hủy phòng của địa điểm bạn
                lựa chọn.
            </p>
        </div>
    );
};

export default CancellationPolicy;
