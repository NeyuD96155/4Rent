import React from 'react';
import Card from '../components/Card';
import '../styles/HomePageContent.css';  // Import CSS file

const HomePageContent = () => {
    const apartments = [
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
    ];

    return (
        <div className="home-page-content">
            <h1>Welcome to Home Page</h1>
            <div className="card-container">
                {apartments.map((apartment, index) => (
                    <Card
                        key={index}
                        title={apartment.title}
                        description={apartment.description}
                        imageUrl={apartment.imageUrl}
                        price={apartment.price}
                        onClickDetail={() => {
                            console.log('View detail clicked for', apartment.title);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePageContent;
