const config = require('../../package.json').projectConfig;
const BACKEND_BASE_URL = config.backendApiUrl;

const COUNTRY_FLAG = {
  BASE_URL: `https://www.flagsapi.com`,
  SIZE: { 16: '16', 24: '24', 32: '32', 48: '48', 64: '64' },
  STYLE: { FLAT: 'flat', SHINY: 'shiny' },
};

const BACKEND_API = {
  BASE_API_URL: `${BACKEND_BASE_URL}/api`,
  REGISTER: `${BACKEND_BASE_URL}/api/register`,
  LOGIN: `${BACKEND_BASE_URL}/api/login`,
  USER_EXIST: `${BACKEND_BASE_URL}/user-exist`,
  GET_PRODUCT: `${BACKEND_BASE_URL}/store/product`,
  GET_STORE: `${BACKEND_BASE_URL}/store/`,
  GET_CATEGORIES:`${BACKEND_BASE_URL}/store/categories`,
  GET_PRODUCT_BY_CATEGORIES:`${BACKEND_BASE_URL}/store/categories/product`,
  ADD_STORE:`${BACKEND_BASE_URL}/store/add-store`
};

const STATIC_IMAGE = {
  BASE_URL: `${BACKEND_BASE_URL}/images`,
  TYPE: {POSTER: 'poster', LOGO: 'logo', GALLERY: 'gallery'},
  SIZE: {SQUARE: 'square', LANDSCAPE: 'landscape', PORTRAIT: 'portrait'},
  QUALITY: {SD: 'sd', HD: 'hd'},
};

export default { COUNTRY_FLAG, BACKEND_API, STATIC_IMAGE };