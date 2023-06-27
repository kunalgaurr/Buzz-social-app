import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlinePhotograph, HiOutlineLocationMarker } from 'react-icons/hi';
import axios from 'axios';

export const CommunityNewPost = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const post = {
    userId: currentUser._id,
    description: description,
    imgae: image,
  };

  const handleClick = async () => {
    const res = await axios.post('/')
  }
  return (
    <div id="community-new-post-container">
      <div id="community-new-post-top">
        <img src="" alt="" id="community-new-post-user-img" />
        <div id="community-new-post-description">
          <input type="text" id="community-new-post-description" />
        </div>
      </div>
      <div id="community-new-post-bottom">
        <div id="community-new-post-left">
          <label htmlFor="image-input">
            <HiOutlinePhotograph className="icon" />
            <input
              type="file"
              name="image-input"
              id="image-input"
              hidden
              onChange={handleFileChange}
            />
          </label>
          <HiOutlineLocationMarker className="icon" />
        </div>
        <button onClick={handleClick}>Post</button>
      </div>
    </div>
  );
};
