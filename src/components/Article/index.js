import { useState, useEffect, Fragment } from "react";
import Body from "./Body";
import classnames from "classnames";
import Preview from "./Preview";
import "./article.scss";
const Article = ({
  article,
  handleLoadArticle,
  isList,
  isArticleView,
  forbidden,
  hasSubscription
}) => {
  if (!article) return null;
  const {
    publishingTime,
    updateTime,
    listImage,
    tags,
    preamble,
    body,
    authors,
    uuid,
    premium
  } = article;
  const isPremium = premium || forbidden;
  const listImageClass = classnames("Article__image", {
    "Article__image-isList": isList
  });
  const articleTitle = classnames("title", {
    list_title: isList
  });
  // console.log({ body });
  const getFormatedTime = isoString => {
    const date = new Date(isoString);
    return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes()} `;
  };

  if (isPremium && isArticleView && !hasSubscription) {
    const { not_entitled } = article;
    const { articlePreview } = not_entitled;
    return (
      <section className="Article__teaser">
        <Preview preview={articlePreview} getFormatedTime={getFormatedTime} />
        <div className="paywall">
          <header>
            <h1>Thanks for reading</h1>
            <h1>Create your account or log in to continue.</h1>
          </header>
        </div>
      </section>
    );
  }
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
              <span>PHOTO:{listImage.byline}</span>
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
            <b>{authors[0] && authors[0].byline}</b>
            <br />
            <span>{getFormatedTime(publishingTime)} </span>
            <span>UPDATED {getFormatedTime(updateTime)}</span>
          </p>
          <p className="Article__preamble">{preamble}</p>
          <section className="Article__body">
            {body && <Body body={body} />}
          </section>
        </Fragment>
      )}
      {isPremium && !isArticleView && (
        <span className="Article__isPremium">Premium</span>
      )}
    </article>
  );
};

export default Article;
