import React, { useEffect, useState } from 'react';
import { Wrapper } from '../../Components/Wrapper/Wrapper';
import { Topbar } from '../../Components/Topbar/Topbar';
import { HiOutlineHome } from 'react-icons/hi';
import { Article } from '../../Components/News/Article';
import './News.css';
import { PageWrapper } from '../../Components/PageWrapper/PageWrapper';

export const News = () => {
  const [news, setNews] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'x-api-key': 'e5926eb9e1c04eae91796fe8a26085c7',
      },
    };
    // setLoading(true);
    fetch(`https://newsapi.org/v2/top-headlines?q=India`, options)
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
        // setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Wrapper>
      <div id="news-container">
        <Topbar name={'News'} logo={<HiOutlineHome className="icon" />} />
        <PageWrapper>
          {news.articles &&
            news.articles.map((e) => <Article news={e} key={e.url} />)}
        </PageWrapper>
      </div>
    </Wrapper>
  );
};
