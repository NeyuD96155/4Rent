import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import Link
import '../styles/Success.css'; // Import CSS file

const Success = () => {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {};
    for (let param of searchParams.entries()) {
      params[param[0]] = param[1];
    }
    setQueryParams(params);
  }, [location.search]);

  return (
    <div className="success-container">
      <h1>Thanh toán thành công!</h1>
      {queryParams && (
        <div className="payment-info">
          <h2>Thông tin thanh toán:</h2>
          <p className="transaction-id">Mã GD: {queryParams.vnp_TxnRef}</p> 
          <p className="amount">Số tiền: {queryParams.vnp_Amount}</p> 
        </div>
      )}
      <Link to="/booking-history" className="booking-history-link">Xem lịch sử đặt phòng</Link> {/* Add Link */}
    </div>
  );
};

export default Success;
