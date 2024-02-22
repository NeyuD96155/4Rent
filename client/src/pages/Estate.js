import React, { useEffect, useState } from 'react';
import api from '../config/axios'; // Đảm bảo bạn đã cấu hình axios đúng cách
import { toast } from "react-toastify";

const EstateListings = () => {
  const [estates, setEstates] = useState([]); // Lưu trữ dữ liệu từ API

  useEffect(() => {
    const fetchEstates = async () => {
      try {
        const response = await api.get('/estate');
        setEstates(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        // Kiểm tra và xử lý lỗi một cách linh hoạt hơn
        const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi lấy dữ liệu.";
        toast.error(`Lỗi khi lấy dữ liệu: ${errorMessage}`);
      }
    };
  
    fetchEstates();
  }, []);
  return (
    <div>
      <h1>Danh Sách Căn Hộ</h1>
      <div>
        {estates.map((estate) => (
          <div key={estate.id}>
            <h2>{estate.name}</h2>
            <p>{estate.description}</p>
            <p>Địa điểm: {estate.location}</p>
            <p>Loại: {estate.type}</p>
            {/* Thêm bất kỳ thông tin nào bạn muốn hiển thị */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstateListings;
