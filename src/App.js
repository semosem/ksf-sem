import { useEffect, useState } from "react";
/* published lettera
import Lettera from "letteraa";*/
import { Carousel } from "react-responsive-carousel";
import HblLogo from "./components/HblLogo";
import Article from "./components/Article/index";
import { fetchArticles, fetchSingleArticle } from "./helpers/fetchArticles";
import "./App.scss";

function App() {
  const [articles, setArticles] = useState([[], [], []]);
  const [currentArticle, setCurrentArticle] = useState(null);
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
  }, []);

  const handleLoadArticle = articleUid => {
    fetchSingleArticle(articleUid).then(article => setCurrentArticle(article));
  };

  const [latestArticles, mostreadArticles, frontpageArticles] = articles;
  console.log(currentArticle.not_entitled);
  return (
    <div className="App">
      <header className="App__header">
        <section className="App__header-navigation">
          <HblLogo />
          <span>Articles API Implementation</span>
        </section>
      </header>
      <main className="App__main-wrapper">
        {/* most read carousel */}
        <section className="App__carousel">{}</section>
        {/*frontpage article list */}
        {frontpageArticles.length &&
          frontpageArticles.map(article => (
            <Article
              key={article.uuid}
              article={article}
              handleLoadArticle={handleLoadArticle}
            />
          ))}
        {/* lastest articles */}
        <section className="recommended"></section>
      </main>
    </div>
  );
}

export default App;
