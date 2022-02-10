enum RequestPaths {
  WORDS = '/words',
  USERS = '/users',
  SIGNIN = '/signin',
  STATISTICS = '/statistics',
  TOKENS = '/tokens',
}

enum ResponseStatuses {
  OK = 200,
  NOT_FOUND = 404,
  UNPROCESSABLE = 422,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  NO_CONTENT = 204,
  FORBIDDEN = 403,
  PAYMENT_REQUIRED = 402,
  EXPECTATION_FAILED = 417,
}

interface WordResponse {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string; // TODO fix type
  textExample: string; // TODO fix type
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
}

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

interface TokenResponse {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

interface UserWordOptions {
  viewed?: number;
  wrongAnswers?: number;
  rightAnswers?: number;
  rightChain?: number;
  done?: boolean;
}

interface UserStatisticOptions {
  // TODO what is word options?
  option1?: string;
}

interface UserWordResponse {
  id: string;
  wordId: string;
  difficulty: string;
  optional: UserWordOptions;
}

interface UserStatisticsResponse {
  learnedWords: number;
  optional: UserStatisticOptions;
}

export { RequestPaths, ResponseStatuses };
export type { WordResponse, UserResponse, UserRequest, TokenResponse, UserWordResponse, UserStatisticsResponse };
