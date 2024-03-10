import React, { useEffect, useState } from "react";
import "../styles/DiscountShow.css";
import api from "../config/axios";
export const DiscountShow = () => {
    const [posts, setPosts] = useState([]);
    const fetchPost = async () => {
        const response = await api.get("/post/show");
        setPosts(response.data);
    };

    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <div className="discount">
            <div className="discount__left"></div>
            <div className="discount__mid">
                {posts.map((post) => {
                    return <Post data={post} />;
                })}
            </div>
            <div className="discount__right"></div>
        </div>
    );
};

const Post = ({ data }) => {
    return (
        <div className="post">
            <div className="poster">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <div>
                    <p>Tran Gia Bao</p>
                    <span>5 mins ago</span>
                </div>
            </div>

            <p>{data.content}</p>

            {/* <FbImageLibrary
                countFrom={5}
                images={data.resources?.map((item) => item.url) || []}
                hideOverlay
            /> */}
        </div>
    );
};
