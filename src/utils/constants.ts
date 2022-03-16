const API_URL = 'https://rslang-komalapa.herokuapp.com';

const PASSWORD_RULES = {
  length: 8,
  differentCase: false,
  numbers: false,
};

const MAX_USER_NAME_LENGTH = 10;

const LS_AUTH_KEY = 'RS_LANG_user';

const WORD_LEARNING_CHAIN = 3;
const DIFFICULT_WORD_LEARNING_CHAIN = 5;

const SCREEN_WIDTH_FULL = window.matchMedia('(min-width: 800px)').matches;
const SCREEN_WIDTH_SMALL = window.matchMedia('(max-width: 500px)').matches;

export {
  API_URL,
  PASSWORD_RULES,
  MAX_USER_NAME_LENGTH,
  LS_AUTH_KEY,
  WORD_LEARNING_CHAIN,
  DIFFICULT_WORD_LEARNING_CHAIN,
  SCREEN_WIDTH_FULL,
  SCREEN_WIDTH_SMALL,
};
