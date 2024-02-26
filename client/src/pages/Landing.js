// HomePageContent.js
import React from "react";

// import SearchBar from "./SearchBar";
import HeroSection from "../components/HeroSection";
import TimesharePosts from "./Estate";

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
