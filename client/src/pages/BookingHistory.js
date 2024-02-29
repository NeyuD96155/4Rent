import React, { useEffect, useState } from 'react';
import axios from '../config/axios';

function BookingHistory({ userId }) {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`/bookings/history/${userId}`);
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings", error);
            }
        };

        fetchBookings();
    }, [userId]);

    return (
        <div>
            <h2>Lịch Sử Booking</h2>
            {/* Render bookings here */}
        </div>
    );
}

export default BookingHistory;
