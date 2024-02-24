// TimesharePosts.js
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import api from "../config/axios";
import '../styles/Estate.css';

const TimesharePosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/post/show');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching timeshare posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (post) => {
    navigate(`/post/detail/${post.id}`, { state: { post } });
  };

  return (
    <div className="timeshare-posts-container">
      <h1>Timeshare Posts</h1>
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="post-card" onClick={() => handlePostClick(post)}>
            {post.resources.length > 0 ? <img src={post.resources[0].url} alt="Post" /> : <img src='https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg' alt="Placeholder" />}
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Price: ${post.price}</p>
            <p>Date Posted: {format(new Date(post.postDate), 'PPP')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimesharePosts;
