enum RequestPaths {
  WORDS = '/words',
  USERS = '/users',
  SIGNIN = '/signin',
  STATISTICS = '/statistics',
  TOKENS = '/tokens',
  AGGREGATED_WORDS = '/aggregatedWords',
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
  NO_DATA = 204,
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

interface AggregatedWordResponse {
  _id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  userWord: {
    difficulty: string;
    optional: UserWordOptions;
  };
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

interface UserWordResponse {
  id: string;
  wordId: string;
  difficulty: string;
  optional: UserWordOptions;
}

interface AggregatedWordsResponse {
  paginatedResults: AggregatedWordResponse[];
  totalCount: Record<'count', number>;
}

interface GameStatistic {
  newWords: number;
  learnedWords: number;
  chainLength: number;
  wrongAnswers: number;
  rightAnswers: number;
}

interface DayStatistic {
  sprint: GameStatistic;
  audio: GameStatistic;
}

interface StatisticOptions {
  [date: string]: DayStatistic;
}

interface UserStatisticsResponse {
  learnedWords: number;
  optional: StatisticOptions;
}

export { RequestPaths, ResponseStatuses };
export type {
  WordResponse,
  UserResponse,
  UserRequest,
  TokenResponse,
  UserWordResponse,
  UserWordOptions,
  UserStatisticsResponse,
  AggregatedWordsResponse,
  AggregatedWordResponse,
  GameStatistic,
};
