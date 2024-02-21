import React from "react";
import "../styles/SearchBar.css"; // Đảm bảo link đến file CSS của bạn

const SearchBar = () => {
    return (
        <div className="search-bar">
            <label>
                {/* Where Are You Going To? */}
                <input type="text" placeholder="Bạn muốn đi đâu?" />
            </label>

            <label>
                {/* Check In Date */}
                <input type="date" placeholder="Ngày nhận phòng" />
            </label>

            <label>
                {/* Check Out Date */}
                <input type="date" placeholder="Ngày trả phòng" />
            </label>

            <label>
                {/* Adults */}
                <input type="number" min="1" placeholder="Số lượng người tham gia" />
            </label>

            <label>
                {/* Room Type */}
                <select>
                    <option value="single">Single Room</option>
                    <option value="double">Double Room</option>
                    <option value="suite">Suite</option>
                </select>
            </label>

            <button type="submit">Search</button>
        </div>
    );
};

export default SearchBar;
