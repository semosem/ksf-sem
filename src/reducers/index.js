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
    default:
  }
  return state;
};
export default reducer;
