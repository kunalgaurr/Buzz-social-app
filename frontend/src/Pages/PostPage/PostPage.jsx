import React, { useEffect, useState } from 'react';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { PageWrapper } from '../../Components/PageWrapper/PageWrapper';
import { Post } from '../../Components/Post/Post';
import { Topbar } from '../../Components/Topbar/Topbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader } from '../../Components/Loader/Loader';
import './PostPage.css';

export const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

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
      <PageWrapper>
        <Post data={post} />
      </PageWrapper>
    </Wrapper>
  );
};
