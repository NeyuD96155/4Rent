import React from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentSuccess = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get('status'); // Ví dụ: 'status' là tham số query được backend truyền qua

    React.useEffect(() => {
        // Kiểm tra query params và hiển thị thông báo toast tương ứng
        if (paymentStatus === 'success') {
            toast.success("Thanh toán thành công! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.");
        } else if (paymentStatus === 'failed') {
            toast.error("Thanh toán không thành công. Vui lòng thử lại.");
        }
    }, [paymentStatus]);

    // Tùy vào logic, có thể cần một state hoặc logic khác
    // để xác định nội dung chính xác cần hiển thị.

    return (
        <div>
            <h1>Trạng Thái Thanh Toán</h1>
            <p>{paymentStatus === 'success' ? 'Thanh toán đã được xử lý thành công.' : 'Có lỗi xảy ra trong quá trình thanh toán.'}</p>

        </div>
    );
};

export default PaymentSuccess;
