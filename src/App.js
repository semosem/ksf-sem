import { useEffect, useState } from "react";
/* published lettera
import Lettera from "letteraa";*/
import classnames from "classnames";
import { Carousel } from "react-responsive-carousel";
import { HblLogo, Rect } from "./components/Icons/index";
import Article from "./components/Article/index";
import List from "./components/List/index";
import { fetchArticles, fetchSingleArticle } from "./helpers/fetchArticles";
import "./App.scss";

function App() {
  const [articles, setArticles] = useState([[], [], []]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [scrollTop, setScrollTop] = useState(null);
  useEffect(() => {
    // TODO: find work around for Error - Request has been terminated
    // when using generated clients
    /*
    const apiInstance = new Lettera.ListsApi();
    const opts = {
      start: 56, // Number |
      limit: 56, // Number |
      category: "category_example", // String |
      paper: "paper_example" // String |
    };
    const callback = function(error, data, response) {
      console.log({ error, data, response });
      if (error) {
        console.error(error);
      } else {
        console.log("API called successfully. Returned data: " + data);
      }
    };
    apiInstance.frontpageGet(opts, callback);
    */
    // use swagger end points instead
    fetchArticles().then(res => setArticles(res));

    const scrollListener = document.addEventListener("scroll", () => {
      const latestListScrollTop = window.scrollY;
      window.requestAnimationFrame(() => setScrollTop(latestListScrollTop));
    });

    return () => {
      // eslint-disable-line consistent-return
      document.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const handleLoadArticle = articleUid => {
    fetchSingleArticle(articleUid).then(article => setCurrentArticle(article));
  };

  const stickysidebar = classnames("latest-list", {
    sticky: scrollTop >= 75
  });

  const [latestArticles, mostreadArticles, frontpageArticles] = articles;

  return (
    <div className="App">
      <header className="App__header">
        <section className="App__header-navigation">
          <HblLogo />
        </section>
        <section className="App__subscribe">
          <h2>Subscribe</h2>
        </section>
      </header>
      <main className="App__main-wrapper">
        {/* most read carousel */}
        <section className="carousel">{}</section>
        {/*frontpage article list */}
        {!currentArticle ? (
          <section className="frontpage-list">
            {frontpageArticles.length &&
              frontpageArticles.map(article => (
                <Article
                  key={article.uuid}
                  article={article}
                  isFront={true}
                  handleLoadArticle={handleLoadArticle}
                />
              ))}
          </section>
        ) : (
          <section className="frontpage-list">
            <Article
              key={currentArticle.uuid}
              article={currentArticle}
              isArticleView={true}
              handleLoadArticle={() => {}}
            />
          </section>
        )}
        {/* lastest articles */}
        <section className={stickysidebar}>
          <header className="header">
            <Rect />
            <h1>LATEST ARTICLES</h1>
          </header>
          {latestArticles.length &&
            latestArticles.map(article => (
              <List
                key={article.uuid}
                article={article}
                handleLoadArticle={handleLoadArticle}
              />
            ))}
        </section>
      </main>
    </div>
  );
}

export default App;
