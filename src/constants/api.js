// const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BASE_URL_LETTEERA = "https://lettera.api.ksfmedia.fi/v3";
const BASE_URL_PERSONA = "https://persona.api.ksfmedia.fi/v1";

const LETTERA_FRONTPAGE_URL = `${BASE_URL_LETTEERA}/frontpage`;
const LETTERA_MOSTREAD_URL = `${BASE_URL_LETTEERA}/mostread`;
const LETTERA_LATEST_URL = `${BASE_URL_LETTEERA}/latest`;
const LETTERA_ARTICLE_URL = `${BASE_URL_LETTEERA}/article`;
const PERSONA_LOGIN_URL = `${BASE_URL_PERSONA}/login`;
const PERSONA_FETCH_USER = `${BASE_URL_PERSONA}/user`;

module.exports = {
  LETTERA_FRONTPAGE_URL,
  LETTERA_MOSTREAD_URL,
  LETTERA_LATEST_URL,
  LETTERA_ARTICLE_URL,
  PERSONA_LOGIN_URL,
  PERSONA_FETCH_USER
};
