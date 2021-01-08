import { useState, useEffect } from "react";
import Article from "../Article/index";
import "./articleList.scss";
const ArticleList = ({ article, handleLoadArticle }) => {
  if (!article) return null;

  return (
    <section className="Article_list">
      <Article
        key={article.uuid}
        article={article}
        isList={true}
        handleLoadArticle={handleLoadArticle}
      />
    </section>
  );
};

export default ArticleList;
