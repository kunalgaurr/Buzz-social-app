import React, { useState } from 'react';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { PageWrapper } from '../../Components/PageWrapper/PageWrapper';
import { BsFillPencilFill } from 'react-icons/bs';
import './NewCommunity.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { communityScema } from '../../Schema/communitySchema';

export const NewCommunity = () => {
  const user = useSelector((state) => state.auth.user);
  const [community, setCommunity] = useState();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const navigate = useNavigate();

  const { values, errors, touched } = useFormik({
    initialValues: {
      admin: user._id,
      name: name,
      description: description,
    },
    validate: communityScema,
  });

  const handleClick = async () => {
    const communityData = {
      admin: user._id,
      name: name,
      description: description,
    };
    const res = await axios.post('/community/create', communityData);
    await setCommunity(res.data);
    navigate(`/community/${community._id}`);
  };
  return (
    <Wrapper>
      <Topbar />
      <PageWrapper>
        <div id="new-community-container">
          <img src="/assets/bg.jpg" alt="" id="new-community-background" />
          <div id="new-community-wrapper">
            <div id="new-community-top">
              <div id="new-community-image-container">
                <img
                  src="/assets/teamwork.png"
                  alt=""
                  id="new-community-image"
                />
                <div className="edit-image">
                  <BsFillPencilFill />
                </div>
              </div>
              <div id="input-top-right">
                <input
                  type="text"
                  id="community-name-input"
                  placeholder="Enter community name"
                  value={values.name}
                  onChange={(e) => setName(e.target.value)}
                />
                {/* <span>{name.touched ? name.errors : null}</span> */}
                <textarea
                  cols="30"
                  rows="10"
                  placeholder="Enter community description."
                  value={values.description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {/* <span>{description.touched ? description.errors : null}</span> */}
              </div>
            </div>
          </div>
          <div id="new-community-button">
            <button onClick={handleClick}>Create Community</button>
          </div>
        </div>
      </PageWrapper>
    </Wrapper>
  );
};
