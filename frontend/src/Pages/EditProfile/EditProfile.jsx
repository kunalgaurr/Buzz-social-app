import './EditProfile.css';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { PageWrapper } from '../../Components/PageWrapper/PageWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import axios from 'axios';
import { SuccessMessage } from '../../Components/SuccessMessage/SuccessMessage';
import { ErrorMessage } from '../../Components/ErrorMessage/ErrorMessage';
import { loginUser } from '../../redux/authReducer';

export const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user.image);
  const [imageUrl, setImageUrl] = useState(null);
  const [message, setMessage] = useState(undefined);
  const [error, setError] = useState(undefined);

  const name = useRef();
  const email = useRef();
  const desc = useRef();
  const oldPassword = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    dispatch(loginUser(user.email, user.password));
    setImageUrl(response.data.imageUrl);
  };

  const handleImage = async () => {
    try {
      const details = {
        image: imageUrl,
      };
      await axios.put(`/user/${user._id}`, details);
      setMessage('Image uploaded successfully.');
      dispatch(loginUser(user.email, user.password));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleName = async () => {
    try {
      const details = {
        name: name.current.value === '' ? user.name : name.current.value,
      };
      await axios.put(`/user/${user._id}`, details);
      setMessage('Name changed successfully.');
      dispatch(loginUser(user.email, user.password));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmail = async () => {
    try {
      const details = {
        email: email.current.value === '' ? user.email : email.current.value,
      };
      await axios.put(`/user/${user._id}`, details);
      setMessage('Email changed successfully');
      dispatch(loginUser(user.email, user.password));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDescription = async () => {
    try {
      const details = {
        description:
          desc.current.value === 'Please enter a description.'
            ? user.description
            : desc.current.value,
      };
      await axios.put(`/user/${user._id}`, details);
      setMessage('Description changed successfully');
      dispatch(loginUser(user.email, user.password));
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePassword = async () => {
    try {
      const details = {
        oldPassword: oldPassword.current.value,
        newPassword: newPassword.current.value,
        confirmPassword: confirmPassword.current.value,
      };
      await axios.put(`/user/${user._id}/reset-password`, details);
      setMessage('Password changed successfully');
      dispatch(loginUser(user.email, user.password));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {};
  return (
    <Wrapper>
      <div id="message-container">
        <SuccessMessage success={message} />
        <ErrorMessage error={error} />
      </div>
      <Topbar />
      <PageWrapper>
        <div id="edit-profile-container">
          <div className="edit-profile-children">
            <span className="edit-profile-header">
              Change your profile picture
            </span>
            <span className="edit-profile-text">
              Click on the picture to edit your profile picture and then choose
              your desired image. The image rendering may take some time so
              please be patient the image will render on the app soon. Make sure
              to click the save changes button at the end of the page.
            </span>
            <label htmlFor="profile-picture" className="edit-profile-label">
              <img
                src={
                  imageUrl === null
                    ? user.image
                      ? user.image
                      : '/assets/user.png'
                    : imageUrl
                }
                alt=""
                id="edit-profile-images"
              />
              <input
                type="file"
                name="profile-picture"
                id="profile-picture"
                hidden
                onChange={handleChange}
              />
              <button className="edit-profile-button" onClick={handleImage}>
                Save picture
              </button>
            </label>
            <p className="success-message">
              Profile picture updated successfully.
            </p>
          </div>
          <div className="edit-profile-children">
            <span className="edit-profile-header">Change your name</span>
            <span className="edit-profile-text">
              Your currently saved name is <span>{user.name}</span> if you wish
              to change your name, please enter your new game in the space
              provided below and then hit the save changes button.
            </span>
            <div className="edit-profile-box">
              <input
                type="text"
                className="edit-profie-input"
                placeholder="Enter your new name."
                ref={name}
              />
              <button className="edit-profile-button" onClick={handleName}>
                Save changes
              </button>
            </div>
          </div>
          <div className="edit-profile-children">
            <span className="edit-profile-header">Change your email</span>
            <span className="edit-profile-text">
              Your currently registered email is <span>{user.email}</span>, if
              your wish to change your email address please enter your new email
              address in the space provided below and then hit the save changes
              button to save the changes.
            </span>
            <div className="edit-profile-box">
              <input
                type="email"
                className="edit-profie-input"
                placeholder="Enter your new email"
                ref={email}
              />
              <button className="edit-profile-button" onClick={handleEmail}>
                Save changes
              </button>
            </div>
          </div>
          <div className="edit-profile-children">
            <span className="edit-profile-header">Change your description</span>
            <span className="edit-profile-text">
              Add a description for your friends to read it and learn more about
              you. After adding a descrition please make sure to hit the save
              changes button to update your descriptio.
            </span>
            <textarea name="" id="" cols="30" rows="10" ref={desc}>
              Please enter a description.
            </textarea>
            <button className="edit-profile-button" onClick={handleDescription}>
              Save changes
            </button>
          </div>
          <div className="edit-profile-children">
            <span className="edit-profile-header">Change your password</span>
            <span className="edit-profile-text">
              If your wish to change your password your need to verify that it
              you, please enter your old password, if the password is verified
              please enter the new password, and then renenter the password.
              Please hit the save changes button to make sure that the changes
              are updated.
            </span>
            <input
              type="password"
              className="edit-profie-input"
              placeholder="Enter your current password."
              ref={oldPassword}
            />
            <input
              type="password"
              className="edit-profie-input"
              placeholder="Enter your new password."
              ref={newPassword}
            />
            <div className="edit-profile-box">
              <input
                type="password"
                className="edit-profie-input"
                placeholder="Please confirm your password."
                ref={confirmPassword}
              />
              <button className="edit-profile-button" onClick={handlePassword}>
                Save changes
              </button>
            </div>
          </div>
          <div className="edit-profile-children">
            <span className="edit-profile-header">Delete your account</span>
            <span className="edit-profile-text">
              Deleting your profile will delete all your data, including posts,
              like, comments, shares, and community memberships. Data once
              deleted cannot be retrieved so please be absolutely sure that you
              want to delete your account, Buzz will not be responsible for
              retrieval of any kind of data.
            </span>
            <button id="delete-button" onClick={handleDelete}>
              Permanantly delete my account.
            </button>
          </div>
        </div>
      </PageWrapper>
    </Wrapper>
  );
};
