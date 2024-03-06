import React, { useState, useEffect } from "react";
import api from "../config/axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import "../styles/Estate.css";

const TimesharePosts = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get("/post/show");
                console.log(response.data);
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching timeshare posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const handlePostClick = (postId) => {
        navigate(`/post/detail/${postId}`, {
            state: { post: posts.find((p) => p.id === postId) },
        });
    };

    return (
        <div className="timeshare-posts-container">
            <h1>Timeshare Posts</h1>
            <div className="posts">
                {posts?.map((post, index) => {
                    console.log(post.resources);
                    return (
                        <div
                            key={index}
                            className="post-card"
                            onClick={() => handlePostClick(post.id)}
                        >
                            {post.resources.length > 0 ? (
                                <img
                                    className="post-image"
                                    src={post.resources[0].url}
                                    alt="Post"
                                />
                            ) : (
                                <img
                                    className="post-image"
                                    src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                                    alt="Placeholder"
                                />
                            )}

                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <p>Giá/ngày: {post.price} vnđ</p>
                            <p>
                                Ngày đăng:{" "}
                                {format(new Date(post.postDate), "PPP")}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TimesharePosts;
