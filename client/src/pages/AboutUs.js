import React from 'react';

const AboutUs = () => {
    return (
        <div className="static-container about-us-section">
            <section className="introduction-section my-5">
                <div className="col">
                    <h1>About Us</h1>
                    <p>Learn more about 4Rent and the mission we carry forward.</p>
                    <p>4Rent is a platform where people can easily and efficiently lease and rent vacation timeshares, ensuring a hassle-free vacation planning experience.</p>
                </div>
            </section>

            <section className="vision-mission-section">
                <div className="row">
                    <div className="col-md-6 vision-section">
                        <h2>Our Vision</h2>
                        <p>At 4Rent, our vision is to revolutionize how people vacation. We strive to connect timeshare owners with a vast network of business establishments, enabling them to discover new destinations easily and comfortably.</p>
                    </div>
                    <div className="col-md-6">
                        <img src="./assets/img/i2.jpg" alt="A representation of 4Rent's vision" className="img-fluid" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <img src="./assets/img/i1.jpg" alt="Illustrating our mission" className="img-fluid" />
                    </div>
                    <div className="col-md-6 mission-section">
                        <h2>Our Mission</h2>
                        <p>Our mission is to empower timeshare owners by providing them with diverse exchange options, top-tier customer service, and invaluable resources to enhance their vacation experiences.</p>
                    </div>
                </div>
            </section>

            <section className="team-history-values-section">
                <div className="row team-section my-4">
                    <div className="col">
                        <h2>Our Team</h2>
                        <p>Meet the passionate individuals behind 4Rent. Our team consists of real estate, technology, and customer service experts, all dedicated to making your vacation dream a reality.</p>
                    </div>
                </div>

                <div className="row history-section my-4">
                    <div className="col">
                        <h2>History</h2>
                        <p>Founded in 2024, 4Rent started as a small startup and has since grown into a leading name in the timeshare exchange industry. Our journey is a testament to our commitment to innovation and customer satisfaction.</p>
                    </div>
                </div>

                <div className="row values-section my-4">
                    <div className="col">
                        <h2>Our Values</h2>
                        <p>At 4Rent, we are guided by values of integrity, collaboration, and excellence. These principles are at the core of everything we do, from how we conduct our business to how we interact with our community.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
