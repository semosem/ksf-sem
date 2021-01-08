import { useState, useEffect, Fragment } from "react";
import Body from "./Body";
import classnames from "classnames";
import "./article.scss";
const Article = ({ article, handleLoadArticle, isList, isArticleView }) => {
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

  const listImageClass = classnames("Article__image", {
    "Article__image-rounded": isList
  });
  const articleTitle = classnames("title", {
    list_title: isList
  });

  return (
    <article className="Article" onClick={() => handleLoadArticle(uuid)}>
      {!isList && tags[0] && <a href="">{tags[0].toUpperCase()}</a>}
      {/* article main image*/}
      {/* title should be above image when component is used on article view */}
      {isArticleView && (
        <header className="Article__header">
          <h2 className={articleTitle}>{article.title}</h2>
        </header>
      )}
      {listImage && (
        <figure className={listImageClass}>
          <img src={listImage.url} alt="article main thumb" />
          {isArticleView && (
            <figcaption>
              {listImage.caption}
              <span>PHOTO</span>:{listImage.byline}
            </figcaption>
          )}
        </figure>
      )}
      {/* title should be below image when not in article view */}
      {!isArticleView && (
        <header className="Article__header">
          <h2 className={articleTitle}>{article.title}</h2>
        </header>
      )}
      {!isList && (
        <Fragment>
          <p className="Article__authors">
            {authors[0] && authors[0].byline}
            <br />
            <span>{publishingTime}</span>
            <span>{updateTime}</span>
          </p>
          <p className="preamble">{preamble}</p>
          {body && body.map(content => <p>{content.html}</p>)}
        </Fragment>
      )}
    </article>
  );
};

export default Article;
