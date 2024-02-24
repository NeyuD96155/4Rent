import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { differenceInCalendarDays, format } from 'date-fns';
import styles from '../styles/PostDetail.module.css';


const PostDetail = () => {
    const { state } = useLocation();
    const post = state ? state.post : null;
    const navigate = useNavigate();

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState(1);
    const [totalFee, setTotalFee] = useState(0);

    useEffect(() => {
        // Đặt điều kiện bên trong useEffect để không vi phạm quy tắc gọi Hook
        if (checkInDate && checkOutDate && guests && post && new Date(checkOutDate) > new Date(checkInDate)) {
            const days = differenceInCalendarDays(new Date(checkOutDate), new Date(checkInDate)) + 1;
            setTotalFee(days * post.price);
        } else {
            setTotalFee(0); // Reset tổng phí nếu điều kiện không đủ
        }
    }, [checkInDate, checkOutDate, guests, post]); // Đảm bảo điều kiện và dependencies đúng

    if (!post) {
        return <div>Post not found. Please go back to the posts list.</div>;
    }

    const handleBookRoom = () => {
        navigate('/payment', { state: { ...post, checkInDate, checkOutDate, guests, totalFee } });
    };
    const formattedDate = post.postDate ? format(new Date(post.postDate), 'PPP') : 'N/A';

    return (
        <div className={styles.postDetailContainer}>
            {/* Phần 1: Hình Ảnh */}
            <div className={styles.postImageContainer}>
                {post.resources && post.resources.length > 0 ? (
                    <img className={styles.postImage} src={post.resources[0].url} alt="Post" />
                ) : (
                    <img className={styles.postImage} src="https://via.placeholder.com/400" alt="Placeholder" />
                )}
            </div>

            {/* Wrapper cho Phần 2 và Phần 3 */}
            <div className={styles.detailsAndBookingContainer}>
                {/* Phần 2: Thông Tin */}
                <div className={styles.postInfoContainer}>
                    <h1 className={styles.postTitle}>{post.title}</h1>
                    <p>{post.content}</p>
                    <p className={styles.postPrice}><strong>Price:</strong> ${post.price}</p>
                    <p className={styles.postDate}><strong>Date Posted:</strong> {formattedDate}</p>
                </div>

                {/* Phần 3: Box Đặt Phòng */}
                <div className={styles.bookingBoxContainer}>
                    <div className={styles.bookingForm}>
                        <input
                            className={styles.bookingFormItem}
                            type="date"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            placeholder="Check-in"
                        />
                        <input
                            className={styles.bookingFormItem}
                            type="date"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            placeholder="Check-out"
                        />
                        <input
                            className={styles.bookingFormItem}
                            type="number"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            placeholder="Guests"
                        />
                        {totalFee > 0 && <p className={styles.totalFee}>Total Fee: ${totalFee}</p>}
                        <button type="button" onClick={handleBookRoom}>Book Room</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
