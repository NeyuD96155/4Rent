// HomePageContent.js
import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<<< HEAD:client/src/components/Landing.js
import Card from './Card';
import '../styles/Landing.css'
import SearchBar from './SearchBar';
========
import Card from '../components/Card';
import '../styles/HomepageContent.css';
>>>>>>>> 9eb05c0bc67d51e1d3b9a53dfec237e4fa4a0b1e:client/src/pages/HomePageContent.js

const Landing = () => {
    const apartments = [
        {
            title: 'Luxury Apartment 1',
            description: 'Another gorgeous apartment with modern amenities.',
            imageUrl: 'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
            price: '$1200 per night',
        },
        {
            title: 'Luxury Apartment 2',
            description: 'Another gorgeous apartment with modern amenities.',
            imageUrl: 'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
            price: '$1200 per night',
        },
        {
            title: 'Luxury Apartment 2',
            description: 'Another gorgeous apartment with modern amenities.',
            imageUrl: 'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
            price: '$1200 per night',
        },
        {
            title: 'Luxury Apartment 2',
            description: 'Another gorgeous apartment with modern amenities.',
            imageUrl: 'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
            price: '$1200 per night',
        },
        {
            title: 'Luxury Apartment 2',
            description: 'Another gorgeous apartment with modern amenities.',
            imageUrl: 'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
            price: '$1200 per night',
        },
        {
            title: 'Luxury Apartment 2',
            description: 'Another gorgeous apartment with modern amenities.',
            imageUrl: 'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
            price: '$1200 per night',
        },
        {
            title: 'Luxury Apartment 2',
            description: 'Another gorgeous apartment with modern amenities.',
            imageUrl: 'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
            price: '$1200 per night',
        },
        {
            title: 'Luxury Apartment 2',
            description: 'Another gorgeous apartment with modern amenities.',
            imageUrl: 'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
            price: '$1200 per night',
        },
        {
            title: 'Luxury Apartment 2',
            description: 'Another gorgeous apartment with modern amenities.',
            imageUrl: 'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
            price: '$1200 per night',
        },
        {
            title: 'Luxury Apartment 2',
            description: 'Another gorgeous apartment with modern amenities.',
            imageUrl: 'https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg',
            price: '$1200 per night',
        },

        // Add more apartments as needed
    ];

    return (
        <div className="home-page-content">
<<<<<<<< HEAD:client/src/components/Landing.js
            <SearchBar/>
            <h1>Các căn hộ nổi bật</h1>
========
            <div class="background-section">
                <h2>New Arrival</h2>
                <p>Discover Our New Real Estates</p>
                <a href="/news" class="buy-now-button">Find Out Now</a>
            </div>
>>>>>>>> 9eb05c0bc67d51e1d3b9a53dfec237e4fa4a0b1e:client/src/pages/HomePageContent.js
            <div className="card-container">
                {apartments.map((apartment, index) => (
                    <Link
                        key={index}
                        to={{
                            pathname: `/detail/${index}`,
                            state: apartment,
                        }}
                        className="card-link"
                    >
                        <Card
                            title={apartment.title}
                            description={apartment.description}
                            imageUrl={apartment.imageUrl}
                            price={apartment.price}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Landing;
