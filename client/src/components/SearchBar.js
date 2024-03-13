import React, { useEffect, useState } from "react";
import { Button, DatePicker, Select } from "antd";
import axios from "../config/axios";
import "../styles/Search.css";

const { RangePicker } = DatePicker;

function SearchBar({ onSearch }) {
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [dateRange, setDateRange] = useState([]);
    const [amount, setAmount] = useState(0);

    // Fetch categories
    const fetchCategories = async () => {
        const response = await axios.get("/showCate");
        setCategories(
            response.data.map((item) => ({
                label: item.categoryname,
                value: item.id,
            }))
        );
    };

    // Fetch locations
    const fetchLocations = async () => {
        const response = await axios.get("/showLocation");
        setLocations(
            response.data.map((item) => ({
                label: item.location,
                value: item.id,
            }))
        );
    };

    useEffect(() => {
        fetchCategories();
        fetchLocations();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const params = {
            categoryId: selectedCategory,
            locationId: selectedLocation,
            amount: amount,
            from: dateRange[0],
            to: dateRange[1],
        };

        try {
            const response = await axios.get("/search", { params });
            onSearch(response.data); // Gọi callback 
        } catch (error) {
            console.error("Có lỗi khi tìm kiếm :", error);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <Select
                    placeholder="Chọn loại hình"
                    onChange={setSelectedCategory}
                    options={categories}
                />
                <Select
                    placeholder="Chọn địa điểm"
                    onChange={setSelectedLocation}
                    options={locations}
                    
                />
                <RangePicker
                    placeholder={["Ngày nhận phòng", "Ngày trả phòng"]}
                    onChange={(dates, dateStrings) => setDateRange(dateStrings)}
                    style={{ width: "40%" }}
                    
                />
                <Select
                    placeholder="Chọn số người tham gia"
                    onChange={setAmount}
                >
                    <Select.Option value={1}>1 người</Select.Option>
                    <Select.Option value={2}>2 người</Select.Option>
                    <Select.Option value={3}>3 người</Select.Option>
                
                </Select>
                <Button type="primary" htmlType="submit" className="search-btn">
                    Tìm kiếm
                </Button>
            </form>
        </div>
    );
}

export default SearchBar;
