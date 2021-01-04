const fetchArticles = () => {
  return Promise.all([
    fetch("https://lettera.api.ksfmedia.fi/v3/latest").then(res => res.json()),
    fetch("https://lettera.api.ksfmedia.fi/v3/mostread").then(res =>
      res.json()
    ),
    fetch("https://lettera.api.ksfmedia.fi/v3/frontpage").then(res =>
      res.json()
    )
  ]);
};

module.exports = {
  fetchArticles
};
