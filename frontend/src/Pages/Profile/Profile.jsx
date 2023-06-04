import './Profile.css';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ProfilePost } from '../../Components/ProfilePost/ProfilePost';
import { PageWrapper } from '../../Components/PageWrapper/PageWrapper';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { Loader } from '../../Components/Loader/Loader';

import axios from 'axios';

export const Profile = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/user/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPosts = async () => {
      const res = await axios.get(`/post/single/${userId}`);
      setPost(res.data);
    };
    fetchUser();
    fetchPosts();
  }, [userId]);

  if (!user || !post) {
    return (
      <Wrapper>
        <Topbar />
        <PageWrapper>
          <Loader />
        </PageWrapper>
      </Wrapper>
    );
  }

  const currentUserId = currentUser._id;
  const handleClick = async () => {
    await axios.put(`/user/${userId}/${currentUserId}`);
  };
  return (
    <Wrapper>
      <div id="profile-container">
        <Topbar />
        <PageWrapper>
          <div id="profile-details">
            <div id="profile-details-left">
              <img
                src={user.image ? user.image : '/assets/user.png'}
                alt=""
                id="profile-picture"
              />
            </div>
            <div id="profile-details-right">
              <div id="profile-details-right-top">
                <div className="profile-stats">
                  <span className="profile-stats-count">
                    {user.friends.length}
                  </span>
                  <span className="profile-stats-name">Friends</span>
                </div>
                <div className="profile-stats">
                  <span className="profile-stats-count">
                    {user.posts.length}
                  </span>
                  <span className="profile-stats-name">Posts</span>
                </div>
                <div className="profile-stats">
                  <span className="profile-stats-count">
                    {user.communities.length}
                  </span>
                  <span className="profile-stats-name">Communities</span>
                </div>
              </div>
              <div id="profile-details-right-buttom">
                <div id="profile-buttons">
                  <button
                    className="profile-button"
                    onClick={
                      currentUser._id === userId
                        ? () => navigate(`/profile/${user._id}/edit`)
                        : () => navigate(`/chat/${user._id}`)
                    }
                  >
                    {currentUser._id === userId ? 'Edit Profile' : 'Message'}
                  </button>
                  <button
                    className="profile-button"
                    onClick={
                      currentUser._id === userId
                        ? () => navigate(`/profile/${user._id}/settings`)
                        : handleClick
                    }
                  >
                    {currentUser._id === userId
                      ? 'Settings'
                      : user.friends.includes(currentUser._id)
                      ? 'Remove Friend'
                      : 'Add friend'}
                  </button>
                </div>
              </div>
              <div id="profile-information">
                <span id="profile-username">{user.name}</span>
                <span id="profile-description">{user.description}</span>
              </div>
            </div>
          </div>
          <div id="profile-post-buttons">
            <span className="profile-post-button">Posts</span>
            <span className="profile-post-button">Shared</span>
          </div>
          <div id="profile-posts">
            {post.reverse().map((e) => (
              <ProfilePost key={e._id} data={e} />
            ))}
          </div>
        </PageWrapper>
      </div>
    </Wrapper>
  );
};
