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
const recieveUserInfo = userId => {
  return {
    type: types.USER_RECEIVE,
    payload: {
      userId
    }
  };
};
const startFetchingUser = () => {
  return {
    type: types.USER_LOADING
  };
};
const failFetchingUser = () => {
  console.log("dispatched user info");
  return {
    type: types.USER_FETCH_FAIL
  };
};

const setSession = resResult => {
  localStorage.setItem("access_token", resResult.token);
  localStorage.setItem("userId", resResult.uuid);
};

const handleAuthentication = () => {
  const accessToken = localStorage.getItem("access_token");
  const uuid = localStorage.getItem("userId");
  if (accessToken && uuid) {
    return {
      headers: {
        AuthUser: `${uuid}`,
        Authorization: `OAuth ${accessToken}`
      }
    };
  }
  return null;
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
  dispatch(startFetchingUser());
  const response = await axios
    .post(api.PERSONA_LOGIN_URL, userInfo)
    .then(token => token)
    .catch(err => dispatch(failFetchingUser()));

  if (response && response.status === 200) {
    window.location.href = "/";
    const { data } = response;
    setSession(data);
    dispatch(recieveUserInfo(data.uuid));
  }

  // const user = await axios
  //   .get(api.PERSONA_FETCH_USER, {
  //     headers: {
  //       AuthUser: "",
  //       Authorization: `OAuth ${data.token}`,
  //       uuid: `${data.uuid}`,
  //       "Access-Control-Allow-Origin": "*"
  //     },
  //     method: "POST",
  //     body: userInfo
  //   })
  //   .then(token => console.log(token));
};

export const fetchSingleArticle = articleUid => async dispatch => {
  const article = await fetch(
    `${api.LETTERA_ARTICLE_URL}/${articleUid}`,
    handleAuthentication()
  )
    .then(res => res.json())
    .then(article => {
      // replace url with article title (
      // TODO: replace spaces with (-), some articles not working
      // const { title } = article;
      // if (title) {
      //   const articleTitle = JSON.stringify(article.title.replace(/ /g, "-"));
      //   window.history.pushState(
      //     { article_id: article.uuid },
      //     null,
      //     articleTitle
      //   );
      // }
      return article;
    });
  dispatch(loadArticle(article));
};
