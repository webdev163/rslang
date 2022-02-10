import { AudioAction, AudioActionTypes, AudioState } from '../../types/audiocall';

const initialState: AudioState = {
  words: [],
  currentWord: null,
  options: [],
  isGameOn: false,
  group: 0,
  score: 0,
  pointsForAnswer: 10,
};

export const audioReducer = (state = initialState, action: AudioAction): AudioState => {
  switch (action.type) {
    case AudioActionTypes.SET_WORDS:
      return { ...state, words: action.payload };
    case AudioActionTypes.SET_CURRENT_WORD:
      return { ...state, currentWord: action.payload.word, options: action.payload.options };
    case AudioActionTypes.REMOVE_WORD:
      return { ...state, words: state.words.filter(word => word.word !== action.payload.word) };
    case AudioActionTypes.SET_GROUP:
      return { ...state, group: action.payload.group, words: action.payload.words };
    case AudioActionTypes.START_GAME:
      return { ...state, isGameOn: true };
    case AudioActionTypes.STOP_GAME:
      return { ...state, isGameOn: false };
    case AudioActionTypes.INCREMENT_SCORE:
      return { ...state, score: state.score + state.pointsForAnswer };
    case AudioActionTypes.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
