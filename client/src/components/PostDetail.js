import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Gallery from "./Gallery";
import Rating from "./Rating";
import AmenitiesList from "./AmenitiesList";
import HostInfo from "./HostInfo";
import BookingPolicy from "./BookingPolicy";
import FAQ from "./FAQ";
import SimilarListings from "./SimilarListings";

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await axios.get(`/api/posts/${postId}`);
            setPost(data);
        };
        fetchPost();
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Gallery images={post.images} />
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <h3>Price Information</h3>
            <p>Per Night: {post.pricePerNight}</p>
            <p>Cleaning Fee: {post.cleaningFee}</p>
            <p>Extra Fees: {post.extraFees.join(", ")}</p>
            <Rating rating={post.rating} />
            <AmenitiesList amenities={post.amenities} />
            <HostInfo host={post.host} />
            <BookingPolicy bookingPolicy={post.bookingPolicy} />
            <FAQ faqs={post.faqs} />
            <hr />
            <SimilarListings location={post.location} />
        </div>
    );
};

export default PostDetail;
