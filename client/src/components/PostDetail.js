import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <h3>Price Information</h3>
            <p>Per Night: {post.pricePerNight}</p>
            <p>Cleaning Fee: {post.cleaningFee}</p>
            <p>Extra Fees: {post.extraFees.join(", ")}</p>

            <hr />
        </div>
    );
};

export default PostDetail;
