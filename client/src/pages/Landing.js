// HomePageContent.js
import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import "../styles/Landing.css";
// import SearchBar from "./SearchBar";
import HeroSection from "../components/HeroSection";
const Landing = () => {
    const apartments = [
        {
            title: "Luxury Apartment 1",
            description: "Another gorgeous apartment with modern amenities.",
            imageUrl:
                "https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg",
            price: "$1200 per night",
        },
        {
            title: "Luxury Apartment 2",
            description: "Another gorgeous apartment with modern amenities.",
            imageUrl:
                "https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg",
            price: "$1200 per night",
        },
        {
            title: "Luxury Apartment 2",
            description: "Another gorgeous apartment with modern amenities.",
            imageUrl:
                "https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg",
            price: "$1200 per night",
        },
        {
            title: "Luxury Apartment 2",
            description: "Another gorgeous apartment with modern amenities.",
            imageUrl:
                "https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg",
            price: "$1200 per night",
        },
        {
            title: "Luxury Apartment 2",
            description: "Another gorgeous apartment with modern amenities.",
            imageUrl:
                "https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg",
            price: "$1200 per night",
        },
        {
            title: "Luxury Apartment 2",
            description: "Another gorgeous apartment with modern amenities.",
            imageUrl:
                "https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg",
            price: "$1200 per night",
        },
        {
            title: "Luxury Apartment 2",
            description: "Another gorgeous apartment with modern amenities.",
            imageUrl:
                "https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg",
            price: "$1200 per night",
        },
        {
            title: "Luxury Apartment 2",
            description: "Another gorgeous apartment with modern amenities.",
            imageUrl:
                "https://api.xaynhadeponline.com/uploads/xu_huong_thiet_ke_nha_cap_4_2c53ffe032.jpg",
            price: "$1200 per night",
        },

        // Add more apartments as needed
    ];

    return (
        <div className="landing-page">
            {/* <SearchBar /> */}
            <HeroSection />
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