import { useState, useEffect } from "react";
import Body from "./Body";
import "./article.scss";
const Article = ({ article, handleLoadArticle }) => {
  if (!article) return null;
  const {
    publishingTime,
    updateTime,
    listImage,
    tags,
    preamble,
    body,
    authors,
    uuid
  } = article;

  return (
    <article className="Article" onClick={() => handleLoadArticle(uuid)}>
      <header className="Article__header">
        {tags[0] && <a href="">{tags[0].toUpperCase()}</a>}
        <h2>{article.title}</h2>
      </header>
      {/* article main image*/}
      {listImage && (
        <figure className="Article__image">
          <img src={listImage.url} alt="article main thumb" />
          <figcaption>
            {listImage.caption}
            <span>PHOTO</span>:{listImage.byline}
          </figcaption>
        </figure>
      )}
      <p className="Article__authors">
        {authors[0] && authors[0].byline}
        <br />
        <span>PUBLISHED: {publishingTime}</span>
        <span>UPDATED: {updateTime}</span>
      </p>
      <p className="preamble">{preamble}</p>
      {body && body.map(content => <p>{content.html}</p>)}
    </article>
  );
};

export default Article;
