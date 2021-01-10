import { Fragment } from "react";
import parse from "html-react-parser";
import Body from "./Body";

const Preview = ({ preview, getFormatedTime }) => {
  if (!preview) return;
  const {
    publishingTime,
    updateTime,
    listImage,
    tags,
    preamble,
    body,
    authors,
    title
  } = preview;

  return (
    <article className="Article">
      {tags && tags[0] && <a href="">{tags[0].toUpperCase()}</a>}
      {/* article main image*/}
      {/* title should be above image when component is used on article view */}
      <header className="Article__header">
        <h2 className="title">{title}</h2>
      </header>
      {listImage && (
        <figure className="Article__image">
          <img src={listImage.url} alt="article main thumb" />
          <figcaption>
            {listImage.caption}
            <span>PHOTO:{listImage.byline}</span>
          </figcaption>
        </figure>
      )}
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
    </article>
  );
};

export default Preview;
