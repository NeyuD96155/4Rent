import React, { useEffect, useState } from "react";
import { Button, DatePicker, Select } from "antd";
import axios from "../config/axios";
import "../styles/Search.css";

const { RangePicker } = DatePicker;

function SearchBar() {
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [dateRange, setDateRange] = useState([]);
    const [amount, setAmount] = useState(0);

    // Fetch categories
    const fetchCategories = async () => {
        const response = await axios.get("/showCate");
        setCategories(response.data.map(item => ({ label: item.categoryname, value: item.id })));
    };

    // Fetch locations
    const fetchLocations = async () => {
        const response = await axios.get("/showLocation");
        setLocations(response.data.map(item => ({ label: item.location, value: item.id })));
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
            console.log(response.data);
        } catch (error) {
            console.error("Error when fetching search data:", error);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <Select
                    placeholder="Select a category"
                    onChange={setSelectedCategory}
                    options={categories}
                />
                <Select
                    placeholder="Select a location"
                    onChange={setSelectedLocation}
                    options={locations}
                />
                <RangePicker
                    onChange={(dates, dateStrings) => setDateRange(dateStrings)}
                />
                <Select
                    placeholder="Select number of people"
                    onChange={setAmount}
                >
                    {/* Update with appropriate options based on your backend's expectations */}
                    <Select.Option value={1}>1 person</Select.Option>
                    <Select.Option value={2}>2 people</Select.Option>
                    <Select.Option value={3}>3 people</Select.Option>
                    {/* ... */}
                </Select>
                <Button type="primary" htmlType="submit" className="search-btn">
                    Search
                </Button>
            </form>
        </div>
    );
}

export default SearchBar;
