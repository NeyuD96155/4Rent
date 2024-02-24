// HomePageContent.js
import React from "react";
import "../styles/Landing.css";
// import SearchBar from "./SearchBar";
import HeroSection from "../components/HeroSection";
import TimesharePosts from "./Estate";
import '../styles/Estate.css'
const Landing = () => {
    

    return (
        <div className="landing-page">
            <HeroSection />
            <div className="landing-card-container">
            <TimesharePosts/>
            </div>
        </div>
    );
};

export default Landing;
