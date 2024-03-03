import React from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import '../styles/PaymentPage.css'; // Giả sử bạn đã tạo một file CSS cho trang này

const PaymentPage = () => {
  const location = useLocation();
  const { bookingDetails, bookingResponse, postDetails } = location.state || {};

  const safeFormatDate = (date) => {
    try {
      return format(new Date(date), 'PPP');
    } catch {
      return 'Ngày không hợp lệ'; // Trả về chuỗi này hoặc bất cứ gì bạn muốn hiển thị nếu ngày không hợp lệ
    }
  };

  return (
    <div className="payment-container">
      {bookingDetails && (
        <div className="booking-details">
          <h2>Thông tin đặt phòng:</h2>
          <p><strong>Check-in:</strong> {safeFormatDate(bookingDetails.checkIn)}</p>
          <p><strong>Check-out:</strong> {safeFormatDate(bookingDetails.checkOut)}</p>
          <p><strong>Người dùng ID:</strong> {bookingDetails.userId}</p>
          <p><strong>Căn hộ ID:</strong> {bookingDetails.estateId}</p>
          <p><strong>Trạng thái:</strong> {bookingDetails.status ? 'Đã xác nhận' : 'Chưa xác nhận'}</p>
        </div>
      )}
      {postDetails && (
        <div className="post-details">
          <h2>Thông tin căn hộ:</h2>
          <p><strong>Tiêu đề:</strong> {postDetails.title}</p>
          <p><strong>Giá:</strong> ${postDetails.price}</p>
          <p><strong>Ngày đăng:</strong> {safeFormatDate(postDetails.postDate)}</p>
          <p><strong>Mô tả:</strong> {postDetails.content}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
