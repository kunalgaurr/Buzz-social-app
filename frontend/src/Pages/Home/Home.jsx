import React, { useEffect, useState } from 'react';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { HiOutlineHome } from 'react-icons/hi';
import './Home.css';
import { PageWrapper } from '../../Components/PageWrapper/PageWrapper';
import { NewPost } from '../../Components/NewPost/NewPost';
import { Post } from '../../Components/Post/Post';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.post.loading);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/post/feed/${user._id}`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();

    if (loading === true) {
      fetchPosts();
    }
  }, [user, loading]);

  if (!data) {
    return (
      <Wrapper>
        <Topbar />
        <PageWrapper>loading...</PageWrapper>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div id="home-container">
        <Topbar name={'Home'} logo={<HiOutlineHome className="icon" />} />
        <PageWrapper>
          <NewPost />
          {data.map((e) => (
            <Post key={e._id} data={e} />
          ))}
        </PageWrapper>
      </div>
    </Wrapper>
  );
};
