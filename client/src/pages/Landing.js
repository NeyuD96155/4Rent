// HomePageContent.js
import React from "react";
import "../styles/Landing.css";
import HeroSection from "../components/HeroSection";
import "../styles/Estate.css";
import EstateShow from "./EstateShow";
import EstateOutstanding from "./EstateOutstanding";

const Landing = () => {
    return (
        <div className="landing-page">
            <HeroSection />
            <div className="landing-card-container">
                <EstateOutstanding />
            </div>
        </div>
    );
};

export default Landing;
