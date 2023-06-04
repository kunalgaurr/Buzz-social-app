import React, { useEffect, useState } from 'react';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { PageWrapper } from '../../Components/PageWrapper/PageWrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { NewPost } from '../../Components/NewPost/NewPost';
import { Post } from '../../Components/Post/Post';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const Explore = () => {
  const [posts, setPosts] = useState([]);
  const loading = useSelector((state) => state.post.loading);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/post/all');
        await setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();

    if (loading === true) {
      fetchPosts();
    }
  }, [loading]);

  return (
    <Wrapper>
      <div id="explore-container">
        <Topbar />
        <PageWrapper>
          <NewPost />
          {posts.map((e) => (
            <Post key={e._id} data={e} />
          ))}
        </PageWrapper>
      </div>
    </Wrapper>
  );
};
