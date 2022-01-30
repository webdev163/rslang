enum RequestPaths {
  WORDS = '/words',
  USERS = '/users'
}

enum ResponseStatuses {
  OK = 200,
  NOT_FOUND = 404,
  UNPROCESSABLE = 422,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  NO_CONTENT = 204,
  FORBIDDEN = 403,
}

interface WordResponse {
  id: string,
  group: number,
  page: number,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string, // TODO fix type
  textExample: string, // TODO fix type
  transcription: string,
  textExampleTranslate: string,
  textMeaningTranslate: string,
  wordTranslate: string
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

export {RequestPaths, ResponseStatuses}
export type {WordResponse, UserResponse, UserRequest, TokenResponse }
