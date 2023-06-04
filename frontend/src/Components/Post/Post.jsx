import React, { useEffect, useRef, useState } from 'react';
import './Post.css';
import axios from 'axios';
import { Comment } from '../Comment/Comment';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../redux/commentReducer';
import { HiDotsVertical } from 'react-icons/hi';
import { format } from 'timeago.js';

export const Post = ({ data }) => {
  const [user, setUser] = useState();
  const [toggle, setToggle] = useState(false);
  const [comments, setComments] = useState([]);
  const [settings, setSettings] = useState(false);
  const [like, setLike] = useState(data.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const comment = useRef(null);
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`user/${data?.userId}`);
      await setUser(res.data);
    };

    fetchUser();
  }, [data]);

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(postComment(currentUser._id, data._id, comment.current.value));
    comment.current.value = '';
    setToggle(true);
  };

  useEffect(() => {
    const getComments = async () => {
      const res = await axios.get(`/comment/${data._id}`);
      setComments(res.data);
    };

    if (toggle === true) {
      getComments();
    }
  }, [toggle, data]);

  const handleLike = async () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);

    await axios.put(`/post/${data._id}/like`, {
      userId: user._id,
      friendId: currentUser._id,
    });
  };

  const handleDelete = async () => {
    await axios.delete(`/post/${data._id}`);
  };

  if (!data || !user) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div id="post-container">
      <div id="error-container">{/* <SuccessMessage success={''} /> */}</div>
      <div id="post-top">
        <div id="post-top-left">
          <img
            src={user.image ? user.image : '/assets/user.png'}
            alt=""
            id="post-user-img"
            onClick={() => navigate(`/profile/${data?.userId}`)}
          />
          <div id="post-header">
            <span
              id="post-user-name"
              onClick={() => navigate(`/profile/${data?.userId}`)}
            >
              {user.name}
            </span>
            <span id="post-duration">{format(data.createdAt)}</span>
          </div>
        </div>
        <div
          id="post-top-right"
          style={{ display: user._id === currentUser._id ? 'block' : 'none' }}
          onClick={() => setSettings(!settings)}
        >
          <HiDotsVertical />
          <div id="post-menu" style={{ display: settings ? 'flex' : 'none' }}>
            <span className="post-menu-item">Edit</span>
            <span className="post-menu-item" onClick={handleDelete}>
              Delete
            </span>
          </div>
        </div>
      </div>
      <div id="post-img-text">
        <span id="post-text">{data?.description}</span>
        <img src={data.image} alt="" id="post-img" />
      </div>
      <div id="post-buttons">
        <span
          id="post-button"
          onClick={handleLike}
          style={{
            color:
              isLiked || data.likes.includes(currentUser._id)
                ? 'var(--blue)'
                : 'white',
          }}
        >
          Like <span>{like}</span>
        </span>
        <span id="post-button" onClick={() => setToggle(!toggle)}>
          Comment
        </span>
        <span id="post-button">Share</span>
      </div>
      <div id="post-comments">
        <div id="new-comment">
          <img
            src={currentUser.image ? currentUser.image : '/assets/user.png'}
            alt=""
            id="post-comment-img"
          />
          <div id="new-comment-wrapper">
            <input
              type="text"
              id="post-comment-input"
              placeholder="What is on your mind ?"
              ref={comment}
            />
            <button id="post-comment-button" onClick={handleComment}>
              Comment
            </button>
          </div>
        </div>
        <div id="post-comment-filter">
          <span id="comment-filter">All Comments</span>
          <span id="comment-filter">
            Sort by <span>Most Popular</span>
          </span>
        </div>
        <div
          id="post-comments"
          style={{
            display: toggle ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '1vh',
          }}
        >
          {comments.length === 0 ? (
            <div id="no-comments">
              <img src="/assets/no-comment.png" alt="" id="no-comment-image" />
              <span id="no-comment-text">
                Wow such empty, be the first one to comment here.
              </span>
            </div>
          ) : (
            comments.map((e) => <Comment key={e._id} comment={e} />)
          )}
        </div>
        <div id="see-comment-button">
          <span id="see-comment-text" onClick={() => setToggle(!toggle)}>
            See All Comments
          </span>
        </div>
      </div>
    </div>
  );
};
