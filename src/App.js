import { useEffect, useState } from "react";
/* published lettera
import Lettera from "letteraa";*/
import { Carousel } from "react-responsive-carousel";
import HblLogo from "./components/HblLogo";
import { fetchArticles } from "./helpers/fetchArticles";
import "./App.scss";

function App() {
  const [articles, setFetchedArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState({});
  useEffect(() => {
    fetchArticles().then(res => setFetchedArticles(res));
    // TODO: find work around for Error - Request has been terminated
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
  }, []);
  console.log({ articles, Carousel });
  return (
    <div className="App">
      <header className="App__header">
        <section className="App__header-navigation">
          <HblLogo />
          <span>Articles API Implementation</span>
        </section>
      </header>
      <main className="App__main-wrapper">
        <section className="App__carousel">
          <Carousel showArrows={true}></Carousel>
        </section>
        {articles.map(article => {
          // return <p>{article.title}</p>;
        })}
      </main>
    </div>
  );
}

export default App;
