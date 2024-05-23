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
  GET_ALL_PRODUCT: `${BACKEND_BASE_URL}/product`,
  GET_ALL_CATEGORIES: `${BACKEND_BASE_URL}/category`,
  GET_ALL_SPECIALDAYS: `${BACKEND_BASE_URL}/specialDay`,
  GET_STORE_BY_PRODUCT_ID: `${BACKEND_BASE_URL}/store/`,
  ADD_FOLLOWER: `${BACKEND_BASE_URL}/store/addFollower/`,
  REMOVE_FOLLOWER: `${BACKEND_BASE_URL}/store/removeFollower/`,
  GET_ALL_CART: `${BACKEND_BASE_URL}/cart`,
  GET_CART_BY_USERID: `${BACKEND_BASE_URL}/cart`,
  UPDATE_QUANTITY: `${BACKEND_BASE_URL}/updateQuantity`,
  ADD_TO_CART: `${BACKEND_BASE_URL}/cart/addToCart`,
  REMOVE_FROM_CART: `${BACKEND_BASE_URL}/cart/remove`,
  GET_ALL_PAYMENTS: `${BACKEND_BASE_URL}/payment`,
  GET_ALL_VOUCHERS: `${BACKEND_BASE_URL}/voucher`,
  CREATE_ORDER: `${BACKEND_BASE_URL}/order/create`,
};

const STATIC_IMAGE = {
  BASE_URL: `${BACKEND_BASE_URL}/images`,
  TYPE: {POSTER: 'poster', LOGO: 'logo', GALLERY: 'gallery'},
  SIZE: {SQUARE: 'square', LANDSCAPE: 'landscape', PORTRAIT: 'portrait'},
  QUALITY: {SD: 'sd', HD: 'hd'},
};

export default { COUNTRY_FLAG, BACKEND_API, STATIC_IMAGE };