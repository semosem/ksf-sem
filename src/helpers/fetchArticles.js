const {
  LETTERA_FRONTPAGE_URL,
  LETTERA_LATEST_URL,
  LETTERA_MOSTREAD_URL,
  LETTERA_ARTICLE_URL
} = require("../constants/api");

const fetchArticles = () => {
  return Promise.all([
    fetch(LETTERA_LATEST_URL).then(res => res.json()),
    fetch(LETTERA_MOSTREAD_URL).then(res => res.json()),
    fetch(LETTERA_FRONTPAGE_URL).then(res => res.json())
  ]);
};

const fetchSingleArticle = articleUid => {
  const article = fetch(`${LETTERA_ARTICLE_URL}/${articleUid}`)
    .then(res => res.json())
    .then(article => {
      // replace url with article url (
      // TODO: replace spaces with (-), some articles not working
      // .replace(/ /g, "-")
      window.history.pushState({}, null, article.title);
      return article;
    });
  console.log({ article });
  return article;
};

module.exports = {
  fetchSingleArticle,
  fetchArticles
};
