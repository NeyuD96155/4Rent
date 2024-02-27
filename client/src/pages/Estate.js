import React, { useState, useEffect } from 'react';
import api from "../config/axios";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const TimesharePosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/post/show');
        setPosts(response.data || []);
      } catch (error) {
        console.error('Error fetching timeshare posts:', error);
        navigate('/error'); 
      }
    };

    fetchPosts();
  }, [navigate]);

  const handlePostClick = (postId) => {
    navigate(`/post/detail/${postId}`);
  };

  return (
    <div className="timeshare-posts-container">
      <h1 className="timeshare-posts-title">Timeshare Posts</h1>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card" onClick={() => handlePostClick(post.id)}>
            <img className="post-card__image" src={post.resources.length > 0 ? post.resources[0].url : 'https://via.placeholder.com/400x300'} alt="Post" />
            <div className="post-card__content">
              <h2 className="post-card__title">{post.title}</h2>
              <p className="post-card__description">{post.content}</p>
              <p className="post-card__price">Price: ${post.price}</p>
              <p className="post-card__date">Date Posted: {format(new Date(post.postDate), 'PPP')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimesharePosts;
