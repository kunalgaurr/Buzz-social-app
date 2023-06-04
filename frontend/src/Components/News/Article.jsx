import React from 'react';
import './Article.css';

export const Article = ({ news }) => {
  return (
    <a id="article-container" href={news.url} target="__blank">
      <div id="article-img-heading">
        <div id="article-heading">
          <span id="article-headline">{news.title}</span>
          <span id="article-author">Author: {news.author}</span>
        </div>
        <img
          src={
            news.urlToImage === null
              ? '/assets/no-picture.png'
              : news.urlToImage
          }
          alt=""
          id="article-img"
        />
      </div>
      <span id="article-content">{news.content}</span>
    </a>
  );
};
