
import React, { useState } from 'react';
import { Button, DatePicker, Select } from 'antd';
import axios from 'axios';
import '../styles/Search.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

function SearchBar() {
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [guests, setGuests] = useState('');

  const provinces = [
    'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh',
    'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau',
    'Cần Thơ', 'Cao Bằng', 'Đà Nẵng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai',
    'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Nội', 'Hà Tĩnh', 'Hải Dương',
    'Hải Phòng', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên', 'Khánh Hòa', 'Kiên Giang',
    'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định',
    'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên', 'Quảng Bình',
    'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La',
    'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang',
    'TP Hồ Chí Minh', 'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái',
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Tạo đối tượng data 
    const searchData = {
      location,
      dateRange,
      guests,
    };

    try {
      // Gửi yêu cầu POST đến server 
      const response = await axios.post('/post/search', searchData);
      console.log(response.data);
      // Xử lý dữ liệu trả về từ server
    } catch (error) {
      console.error('Error when posting search data:', error);
    }
  };

  return (
    <div className='search-container'>
      <form onSubmit={handleSubmit} className='search-form'>
        <Select
          aria-label='Location'
          placeholder='Chọn địa điểm'
          allowClear
          onChange={setLocation}
        >
          {provinces.map(province => (
            <Option key={province} value={province}>
              {province}
            </Option>
          ))}
        </Select>
        <RangePicker
          aria-label='Check-in and check-out date'
          onChange={(_, dateString) => setDateRange(dateString)}
        />
        <Select
          aria-label='Guests'
          placeholder='Chọn số lượng người'
          allowClear
          onChange={value => setGuests(value)}
        >
          <Option value='0.5'>Nửa người</Option>
          <Option value='1'>1 người</Option>
          <Option value='2'>2 người</Option>
        </Select>
        <Button type='primary' htmlType='submit' className='search-btn'>
          Search
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;
