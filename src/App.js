import { useEffect, useState } from "react";
/* published lettera
import Lettera from "letteraa";*/
import classnames from "classnames";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { HblLogo, Rect } from "./components/Icons/index";
import LoginForm from "./components/LoginForm/index";
import Article from "./components/Article/index";
import { fetchArticles, fetchSingleArticle, fetchUser } from "./actions/index";
import "./App.scss";

function App(props) {
  const [scrollTop, setScrollTop] = useState(null);
  const [screenWidth, setScreenWidth] = useState(null);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: ""
  });
  const [showLoginForm, setShowLoginForm] = useState(null);

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
    /*--------------------
    use swagger end points instead
    --------------------*/
    props.onLoad();
    // listeners
    const scrollListener = document.addEventListener("scroll", () => {
      const latestListScrollTop = window.scrollY;
      window.requestAnimationFrame(() => setScrollTop(latestListScrollTop));
    });
    const resizeListener = window.addEventListener("resize", () => {
      window.requestAnimationFrame(() => setScreenWidth(window.innerWidth));
    });

    return () => {
      window.removeEventListener("resize", resizeListener);
      document.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const handleLoadArticle = articleUid => {
    props.fetchSingle(articleUid);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const handleLogin = e => {
    e.preventDefault();
    props.onLogin(userInfo);
  };

  const stickysidebar = classnames("latest-list", {
    sticky: scrollTop >= 75,
    hiden: screenWidth && screenWidth < 1200
  });
  const { allArticles, currentArticle } = props;
  const { http_status } = currentArticle || "";
  const [latestArticles, mostreadArticles, frontpageArticles] = allArticles;
  console.log({ currentArticle });
  return (
    <div className="App">
      <header className="App__header">
        <section className="App__header-navigation">
          <HblLogo />
        </section>
        <section
          className="App__subscribe"
          role="button"
          onClick={() => setShowLoginForm(true)}
        >
          <h2>Login</h2>
        </section>
      </header>
      <main className="App__main-wrapper">
        {/* most read carousel */}
        <section className="carousel">{}</section>
        {/*frontpage article list */}
        {!currentArticle ? (
          <section className="frontpage-list">
            {frontpageArticles.length > 0 &&
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
              status={http_status === "Forbidden"}
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
          <section className="Article_list">
            {mostreadArticles.length > 0 &&
              mostreadArticles.map(article => (
                <Article
                  key={article.uuid}
                  article={article}
                  isList={true}
                  handleLoadArticle={handleLoadArticle}
                />
              ))}
          </section>
        </section>
      </main>
      <LoginForm
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
        handleChange={handleChange}
        handleLogin={handleLogin}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};
const mapActionsToProps = {
  onLoad: fetchArticles,
  fetchSingle: fetchSingleArticle,
  onLogin: fetchUser
};

export default connect(mapStateToProps, mapActionsToProps)(App);
