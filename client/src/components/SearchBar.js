import React, { useEffect, useState } from "react";
import { Button, DatePicker, Select, Form } from "antd";
import api from "../config/axios";
import "../styles/Search.css";

const { RangePicker } = DatePicker;
const { Option } = Select;

function SearchBar() {
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [dateRange, setDateRange] = useState([]);
    const [guests, setGuests] = useState("");

    // fetch category
    const fetchCategories = async () => {
        const response = await api.get("/showCate");
        setCategories(
            response.data.map((item) => {
                return {
                    label: item.categoryname,
                };
            })
        );
    };
    // fetch location
    const fetchLocations = async () => {
        const response = await api.get("/showLocation");
        setLocations(
            response.data.map((item) => {
                return {
                    label: item.location,
                };
            })
        );
    };

    useEffect(() => {
        fetchCategories();
        fetchLocations();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const searchData = {
            locations,
            dateRange,
            guests,
        };

        try {
            const response = await api.get("/search", searchData);
            console.log(response.data);
        } catch (error) {
            console.error("Error when posting search data:", error);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <Select
                    name="categoryId"
                    label="Thể loại"
                    options={categories}
                />

                <Select name="locationId" label="Vị trí" options={locations} />

                <RangePicker
                    aria-label="Check-in and check-out date"
                    onChange={(_, dateString) => setDateRange(dateString)}
                />
                <Select
                    aria-label="Guests"
                    placeholder="Chọn số lượng người"
                    allowClear
                    onChange={(value) => setGuests(value)}
                >
                    <Option value="0.5">Nửa người</Option>
                    <Option value="1">1 người</Option>
                    <Option value="2">2 người</Option>
                </Select>
                <Button type="primary" htmlType="submit" className="search-btn">
                    Search
                </Button>
            </form>
        </div>
    );
}

export default SearchBar;
