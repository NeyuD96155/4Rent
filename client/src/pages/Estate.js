import React, { useState, useEffect } from 'react';
import api from "../config/axios";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom'; 
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


  const handlePostClick = (postId) => {
    navigate(`/post/detail/${postId}`); 
  };

  return (
    <div className="timeshare-posts-container">
      <h1>Timeshare Posts</h1>
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="post-card" onClick={() => handlePostClick(post.id)}>
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
