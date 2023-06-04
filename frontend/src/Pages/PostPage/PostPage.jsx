import React, { useEffect, useState } from 'react';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader } from '../../Components/Loader/Loader';
import './PostPage.css';
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';

export const PostPage = () => {
  const { postId } = useParams();
  const currentUser = useSelector((state) => state.auth.user);
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const response = await axios.get(`/post/${postId}`);
      setPost(response.data);
    };
    getPost();
  }, [postId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (post) {
          const res = await axios.get(`/user/${post.userId}`);
          setUser(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [post]);

  const handleLike = async () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);

    await axios.put(`/post/${postId}/like`, {
      userId: user._id,
      friendId: currentUser._id,
    });
  };

  if (!post || !user) {
    return (
      <Wrapper>
        <Topbar />
        <Loader />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Topbar />
      <div id="post-page-container">
        <div id="post-page-left">
          <img src={post.image} alt="" id="post-page-image" />
        </div>
        <div id="post-page-right">
          <div id="profile-post-right-top">
            <img src={user.image} alt="" id="profile-post-user-image" />
            <div id="profile-post-user-details">
              <span id="profile-post-user-name">{user.name}</span>
              <span id="profile-post-time-ago">{format(post.createdAt)}</span>
            </div>
          </div>
          <div id="post-page-middle">
            <span id="post-pade-description">{post.description}</span>
          </div>
          <div id="post-page-right-bottom">
            <span
              className="post-page-button"
              style={{
                color:
                  post.likes.includes(currentUser._id) || isLiked
                    ? 'var(--blue)'
                    : 'white',
              }}
              onClick={handleLike}
            >
              Like <span>{post.likes.length}</span>
            </span>
            <span className="post-page-button">Comment</span>
            <span className="post-page-button">Share</span>
          </div>
          {/* <div id="post-page-comments">
            <div id="post-page-new-comment">
              <img
                src={currentUser.image}
                alt=""
                id="post-page-current-image"
              />
              <input type="text" id="post-page-comment-input" />
              <button id="post-page-comment-button">Comment</button>
            </div>
          </div> */}
        </div>
      </div>
    </Wrapper>
  );
};
