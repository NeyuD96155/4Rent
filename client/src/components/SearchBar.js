import React, { useState } from "react";
import { Button, DatePicker, Select } from "antd";
import api from "../config/axios";
import "../styles/Search.css";

const { RangePicker } = DatePicker;
const { Option } = Select;

function SearchBar() {
    const [location, setLocation] = useState("");
    const [dateRange, setDateRange] = useState([]);
    const [guests, setGuests] = useState("");
    const [category, setCategory] = useState("");
    const provinces = [
        "An Giang",
        "Bà Rịa - Vũng Tàu",
        "Bắc Giang",
        "Bắc Kạn",
        "Bạc Liêu",
        "Bắc Ninh",
        "Bến Tre",
        "Bình Định",
        "Bình Dương",
        "Bình Phước",
        "Bình Thuận",
        "Cà Mau",
        "Cần Thơ",
        "Cao Bằng",
        "Đà Nẵng",
        "Đắk Lắk",
        "Đắk Nông",
        "Điện Biên",
        "Đồng Nai",
        "Đồng Tháp",
        "Gia Lai",
        "Hà Giang",
        "Hà Nam",
        "Hà Nội",
        "Hà Tĩnh",
        "Hải Dương",
        "Hải Phòng",
        "Hậu Giang",
        "Hòa Bình",
        "Hưng Yên",
        "Khánh Hòa",
        "Kiên Giang",
        "Kon Tum",
        "Lai Châu",
        "Lâm Đồng",
        "Lạng Sơn",
        "Lào Cai",
        "Long An",
        "Nam Định",
        "Nghệ An",
        "Ninh Bình",
        "Ninh Thuận",
        "Phú Thọ",
        "Phú Yên",
        "Quảng Bình",
        "Quảng Nam",
        "Quảng Ngãi",
        "Quảng Ninh",
        "Quảng Trị",
        "Sóc Trăng",
        "Sơn La",
        "Tây Ninh",
        "Thái Bình",
        "Thái Nguyên",
        "Thanh Hóa",
        "Thừa Thiên Huế",
        "Tiền Giang",
        "TP Hồ Chí Minh",
        "Trà Vinh",
        "Tuyên Quang",
        "Vĩnh Long",
        "Vĩnh Phúc",
        "Yên Bái",
    ];
    const categories = [
        { id: 1, name: "Hotel" },
        { id: 2, name: "Apartment" },
        { id: 3, name: "House" },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        const params = {
            location,
            from: dateRange[0],
            to: dateRange[1],
            guests,
            categoryId: category,
        };

        try {
            const response = await api.get("/search", { params });
            console.log(response.data);
        } catch (error) {
            console.error("Error when getting search data:", error);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <Select
                    showSearch
                    placeholder="Chọn địa điểm"
                    allowClear
                    onChange={setLocation}
                >
                    {provinces.map((province) => (
                        <Option key={province} value={province}>
                            {province}
                        </Option>
                    ))}
                </Select>
                <RangePicker
                    onChange={(_, dateString) => setDateRange(dateString)}
                />
                <Select
                    placeholder="Chọn loại"
                    allowClear
                    onChange={(value) => setCategory(value)}
                >
                    {categories.map((cat) => (
                        <Option key={cat.id} value={cat.id}>
                            {cat.name}
                        </Option>
                    ))}
                </Select>

                <Select
                    placeholder="Chọn số lượng người"
                    allowClear
                    onChange={setGuests}
                >
                    <Option value="1">1 người</Option>
                    <Option value="2">2 người</Option>
                    <Option value="3">3 người</Option>
                    <Option value="4">4 người</Option>
                    <Option value="5">5 người</Option>
                </Select>
                <Button type="primary" htmlType="submit" className="search-btn">
                    Tìm kiếm
                </Button>
            </form>
        </div>
    );
}

export default SearchBar;
