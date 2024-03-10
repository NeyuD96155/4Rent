import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    // Gọi API endpoint để lấy dữ liệu lịch sử đặt phòng
    axios.get('/success')
      .then(response => {
        setBookingHistory(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu lịch sử đặt phòng:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lịch sử đặt phòng</h1>
      <ul>
        {bookingHistory.map((booking, index) => (
          <li key={index}>
            <p>Ngày đặt phòng: {new Date(booking.bookingDate).toLocaleDateString()}</p>
            <p>Ngày check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p>Ngày check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
            <p>Số tiền: {booking.amount}</p>
            {/* Hiển thị các thông tin khác của giao dịch */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistory;
