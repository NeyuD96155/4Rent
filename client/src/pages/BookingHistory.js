import React, { useState, useEffect } from 'react';
import api from '../config/axios'; 
import '../styles/BookingHistory.css'; 

const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookingHistory = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/showBookingHistory');
        setBookingHistory(response.data);
      } catch (err) {
        console.error('Error fetching booking history:', err);
        setError(
          err.response?.data?.message ||
            'Failed to load booking history. Please try again later.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  if (isLoading) return <div className="loading">Loading booking history...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="booking-history-container">
      <h1>Lịch Sử Giao Dịch</h1>
      {bookingHistory.length > 0 ? (
        <div className="booking-history">
          {bookingHistory.map((booking) => (
            <div key={booking.id} className="booking-history-entry">
              <h3>Booking ID: {booking.id}</h3>
              <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleString()}</p>
              <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleString()}</p>
              <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
              <p><strong>Price:</strong> {booking.price}</p>
              <p><strong>Amount:</strong> {booking.amount}</p>
              <p><strong>Booked by:</strong> {booking.users.fullname}</p>
              <p><strong>Estate:</strong> {booking.realEstate.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No booking history found.</p>
      )}
    </div>
  );
};

export default BookingHistory;
