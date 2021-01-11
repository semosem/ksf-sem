import * as types from "../constants/actionTypes";

const initialState = {
  user: null,
  currentArticle: null,
  allArticles: [[], [], []]
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FECTH_ALL_ARTICLES:
      return {
        ...state,
        allArticles: action.payload.allArticles
      };
    case types.LOAD_ARTICLE:
      return {
        ...state,
        currentArticle: action.payload.currentArticle
      };
    case types.USER_RECEIVE:
      console.log({ action });
      return {
        ...state,
        user: action.payload.userId,
        loading: false,
        invalidate: false
      };
    case types.USER_LOADING:
      return {
        ...state,
        loading: true,
        invalidate: false
      };
    case types.USER_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        invalidate: true
      };
    default:
  }
  return state;
};
export default reducer;
