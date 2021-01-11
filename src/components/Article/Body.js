import parse from "html-react-parser";

const ArticleBody = ({ body }) => {
  if (!body) return;
  return body.map(content => {
    const { headline, html, box, image } = content;
    if (image) {
      return (
        <figure className="bodyImage">
          <img src={image.url} alt="article main thumb" />
          <figcaption>
            {image.caption}
            <span>PHOTO:{image.byline}</span>
          </figcaption>
        </figure>
      );
    } else if (headline) {
      return <h3 className="preamble">{parse(headline)}</h3>;
    } else if (box) {
      return (
        <div className="box">
          <header>
            <h2>{box.headline}</h2>
            <h2>{box.title}</h2>
          </header>
          <ul>
            {box.content.map(boxContent => {
              return <li className="box_contnet">{parse(boxContent)}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <p className="preamble">{html && parse(html)}</p>;
    }
  });
};

export default ArticleBody;
