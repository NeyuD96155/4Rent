import React, { useState } from "react";
export const OurStory = () => {
    return (
        <div style={{ padding: "20px" }}>
            <h1>About 4Rent</h1>
            <p>
                Founded in the vibrant heart of tech innovation, 4Rent emerged
                as a pioneering platform dedicated to revolutionizing the
                timeshare industry. Our journey began with a simple yet powerful
                idea: to create a seamless, user-friendly space where
                individuals could rent out their timeshare properties with ease
                and transparency.
            </p>
            <p>
                The concept of 4Rent was born out of personal frustration with
                the complexities and rigidities of traditional timeshare
                exchanges. Our founders, avid travelers themselves, encountered
                numerous obstacles when trying to make the most of their
                timeshare investments. Faced with these challenges, they saw an
                opportunity to simplify the process, making vacation rentals
                more accessible and enjoyable for everyone involved.
            </p>
            <p>
                Our platform connects timeshare owners with travelers seeking
                unique accommodation experiences around the globe. By harnessing
                the power of technology, we've streamlined the rental process,
                offering a wide range of properties at the click of a button.
                From the sandy beaches of Nha Trang to the historic streets of
                Đà Nẵng and the breathtaking landscapes of Hạ Long, 4Rent offers
                unparalleled access to some of the world's most sought-after
                destinations.
            </p>
            <p>
                At 4Rent, we believe in creating lasting memories without the
                hassle. Our mission is to empower timeshare owners to unlock the
                full potential of their properties, while providing travelers
                with affordable, flexible, and unique vacation options. We're
                committed to building a community based on trust, transparency,
                and mutual respect, where every vacation rental is an
                opportunity for adventure and connection.
            </p>
            <p>
                As we continue to grow and evolve, our dedication to innovation,
                customer satisfaction, and sustainable tourism remains at the
                core of everything we do. We're excited about the future of
                travel and timeshare rentals, and we invite you to join us on
                this journey. Whether you're looking to rent out your timeshare
                or plan your next vacation, 4Rent is your gateway to a world of
                possibilities.
            </p>
            <h2>Our Vision</h2>
            <p>
                To be the leading online platform for timeshare rentals, where
                anyone can easily access affordable, high-quality vacation
                experiences worldwide.
            </p>
            <h2>Our Values</h2>
            <ul>
                <li>
                    <strong>Transparency:</strong> We believe in clear, honest
                    communication and fair dealings in all our transactions.
                </li>
                <li>
                    <strong>Innovation:</strong> We're constantly seeking new
                    ways to improve our platform and services, embracing
                    technology to meet the changing needs of our users.
                </li>
                <li>
                    <strong>Community:</strong> We're building a global network
                    of timeshare owners and travelers based on mutual respect
                    and shared love for travel.
                </li>
                <li>
                    <strong>Sustainability:</strong> We advocate for responsible
                    tourism, encouraging practices that benefit local
                    communities and preserve natural environments.
                </li>
            </ul>
            <p>
                Thank you for considering 4Rent for your timeshare rental needs.
                We're here to help you discover the joy of travel, one rental at
                a time.
            </p>
        </div>
    );
};
export const Contact1 = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement submission logic here, e.g., send data to an API or email service
        console.log(formData);
        alert("Thank you for contacting us! We will get back to you soon.");
        // Reset form data
        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Contact Us</h1>
            <p>
                If you have any questions or inquiries, please fill out the form
                below and we'll get back to you as soon as possible.
            </p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};


export const PrivacyPolicy = () => {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Privacy Policy for 4Rent</h1>
            <p>
                At 4Rent, accessible from [Your Website URL], one of our main
                priorities is the privacy of our visitors. This Privacy Policy
                document outlines the types of information that is collected and
                recorded by 4Rent and how we use it.
            </p>

            <p>
                This policy is not applicable to any information collected
                offline or via channels other than this website. Consent: By
                using our website, you hereby consent to our Privacy Policy and
                agree to its terms.
            </p>

            <h2>Information We Collect</h2>
            <p>
                The personal information that you are asked to provide, and the
                reasons why you are asked to provide it, will be made clear to
                you at the point we ask you to provide your personal
                information.
            </p>
            <p>
                If you contact us directly, we may receive additional
                information about you such as your name, email address, phone
                number, the contents of the message and/or attachments you may
                send us, and any other information you may choose to provide.
            </p>
            <p>
                When you register for an Account, we may ask for your contact
                information, including items such as name, company name,
                address, email address, and telephone number.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
                We use the information we collect in various ways, including to:
            </p>
            <ul>
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>
                    Develop new products, services, features, and functionality
                </li>
                <li>
                    Communicate with you, directly or through one of our
                    partners, including for customer service, to provide you
                    with updates and other information relating to the website,
                    and for marketing and promotional purposes
                </li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
            </ul>

            <h2>Log Files</h2>
            <p>4Rent follows a standard procedure of using log files.</p>
        </div>
    );
};
