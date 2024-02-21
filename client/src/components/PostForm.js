import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PostForm.css';

function PostForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        apartmentType: '',
        location: '',
        guests: 1,
        bedrooms: '',
        beds: '',
        bathrooms: '',
        amenities: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleIncrement = () => {
        setFormData({ ...formData, guests: formData.guests + 1 });
    };

    const handleDecrement = () => {
        if (formData.guests > 1) {
            setFormData({ ...formData, guests: formData.guests - 1 });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/posts', formData);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    return (
        <div className="post-form-wrapper">
            <div className="post-form-container">
                <h2>Post Your Apartment</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
                    <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
                    <input type="text" name="apartmentType" placeholder="Apartment Type" value={formData.apartmentType} onChange={handleChange} />
                    <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
                    <div>
                        <span>Guests: </span>
                        <button type="button" onClick={handleDecrement}>-</button>
                        <span>{formData.guests}</span>
                        <button type="button" onClick={handleIncrement}>+</button>
                    </div>
                    <input type="number" name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} />
                    <input type="number" name="beds" placeholder="Beds" value={formData.beds} onChange={handleChange} />
                    <input type="number" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} />
                    <textarea name="amenities" placeholder="Amenities" value={formData.amenities} onChange={handleChange}></textarea>
                    <button type="submit">Post</button>
                </form>
            </div>
        </div>
    );
}

export default PostForm;
