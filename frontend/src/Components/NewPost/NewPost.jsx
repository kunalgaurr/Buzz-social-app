import React, { useState } from 'react';
import {
  HiOutlinePhotograph,
  HiOutlineLocationMarker,
  HiOutlineEmojiHappy,
  HiOutlinePencil,
} from 'react-icons/hi';
import EmojiPicker from 'emoji-picker-react';
import './NewPost.css';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPost } from '../../redux/postReducer';
import axios from 'axios';

export const NewPost = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [emoji, setEmoji] = useState(false);
  const [error, setError] = useState(undefined);
  const [postText, setPostText] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setImageUrl(response.data.imageUrl);
      setPreviewImage(response.data.imageUrl);
    } catch (error) {
      setError('Error in uploading image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const post = {
        userId: user._id,
        description: postText,
        image: imageUrl,
      };

      if (postText === '') {
        setError('Please enter a description');
      } else {
        setError(undefined);
      }
      dispatch(uploadPost(post));
    } catch (error) {
      console.log(error);
    }

    setPostText(null);
    setPreviewImage(null);
  };

  const handleDrafts = (e) => {
    e.preventDefault();
    const post = {
      userId: user._id,
      description: postText,
      image: '',
    };
    localStorage.setItem('draft', JSON.stringify(post));
  };
  return (
    <form id="new-post-container" type="submit">
      <div id="new-post-top">
        <img
          src={user.image ? user.image : '/assets/user.png'}
          alt=""
          id="new-post-user-img"
        />
        <input
          type="text"
          id="new-post-text"
          placeholder={`What's on your mind ${user.name.split(' ')[0]}?`}
          name="description"
          onChange={(e) => setPostText(e.target.value)}
        />
      </div>
      <div id="new-post-middle">
        <img
          src={previewImage}
          alt=""
          id="preview-image"
          style={{ display: previewImage === null ? 'none' : 'block' }}
        />
      </div>
      <span className="error-message">{error}</span>
      <div id="new-post-bottom">
        <div id="new-post-options">
          <label htmlFor="image-input">
            <HiOutlinePhotograph className="icon" />
            <input
              type="file"
              name="image-input"
              id="image-input"
              hidden
              onChange={handleFileInputChange}
            />
          </label>
          <HiOutlineLocationMarker className="icon" />
          <HiOutlineEmojiHappy
            className="icon"
            onClick={() => setEmoji(!emoji)}
          />
          {emoji && (
            <div className="emoji-picker">
              <EmojiPicker theme="dark" />
              <button>Add Emoji</button>
            </div>
          )}
        </div>
        <div id="new-post-buttons">
          <button id="new-post-draft-button" onClick={handleDrafts}>
            <HiOutlinePencil />
            Draft
          </button>
          <button id="new-post-button" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>
    </form>
  );
};
