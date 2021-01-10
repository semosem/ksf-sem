import * as types from "../constants/actionTypes";
import * as api from "../constants/api";
import axios from "axios";

const recieveArticles = articles => {
  return {
    type: types.FECTH_ALL_ARTICLES,
    payload: {
      allArticles: articles
    }
  };
};

const loadArticle = article => {
  return {
    type: types.LOAD_ARTICLE,
    payload: {
      currentArticle: article
    }
  };
};
const recieveUserInfo = user => {
  return {
    type: types.USER_RECEIVE,
    payload: {
      user
    }
  };
};

export const fetchArticles = () => async dispatch => {
  const articles = await Promise.all([
    fetch(api.LETTERA_LATEST_URL).then(res => res.json()),
    fetch(api.LETTERA_MOSTREAD_URL).then(res => res.json()),
    fetch(api.LETTERA_FRONTPAGE_URL).then(res => res.json())
  ]);
  dispatch(recieveArticles(articles));
};

export const fetchUser = userInfo => async dispatch => {
  console.log({ userInfo });
  const token = await axios
    .post(api.PERSONA_LOGIN_URL, userInfo)
    .then(token => token);
  const { data } = token;
  const user = await axios
    .get(api.PERSONA_FETCH_USER, {
      headers: {
        AuthUser: "",
        Authorization: `OAuth ${data.token}`,
        uuid: `${data.uuid}`,
        "Access-Control-Allow-Origin": "*"
      },
      method: "POST",
      body: userInfo
    })
    .then(token => console.log(token));

  // dispatch(recieveUserInfo(user));
};

export const fetchSingleArticle = articleUid => async dispatch => {
  console.log("fetching");
  const article = await fetch(`${api.LETTERA_ARTICLE_URL}/${articleUid}`)
    .then(res => res.json())
    .then(article => {
      // replace url with article url (
      // TODO: replace spaces with (-), some articles not working
      // .replace(/ /g, "-")
      // window.history.pushState({}, null, article.title);
      return article;
    });
  console.log("dispatched");
  dispatch(loadArticle(article));
};
