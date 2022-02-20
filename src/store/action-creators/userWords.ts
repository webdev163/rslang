import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AudioAction } from '../../types/audiocall';
import { UserWordOptions, UserWordResponse, WordResponse } from '../../types/requests';
import { SprintAction } from '../../types/sprint';
import { UsersWordsActionTypes, UserWordsActions } from '../../types/user';
import { addUserWord, changeStatistic, getUserWords, updateUserWord } from '../../utils/API';
import { DIFFICULT_WORD_LEARNING_CHAIN, WORD_LEARNING_CHAIN } from '../../utils/constants';
import { RootState } from '../reducers';

export const getUserWordsAction = (userId: string, token: string) => async (dispatch: Dispatch<UserWordsActions>) => {
  dispatch({ type: UsersWordsActionTypes.GET_USERS_WORDS });
  getUserWords(userId, token)
    .then(data => dispatch({ type: UsersWordsActionTypes.SUCCESS, payload: data as UserWordResponse[] }))
    .catch(e => {
      dispatch({ type: UsersWordsActionTypes.ERROR, payload: e as string });
    });
};

export const receiveUserAnswerAction =
  (
    isRightAnswer: boolean,
    word: WordResponse,
    game: 'sprint' | 'audio',
  ): ThunkAction<void, RootState, unknown, UserWordsActions | SprintAction | AudioAction> =>
  async (dispatch, getState) => {
    const state = getState();
    const { userId, token } = state.auth.user;
    if (!userId || !token) return;
    const { words } = state.userWords;
    let chainLength: number;
    let isNewWord = true;
    let isLearnedWord = false;
    if (game === 'sprint') {
      chainLength = state.sprint.chainLength;
    } else {
      chainLength = state.audio.chainLength;
    }
    const userWord = words.find(w => w.wordId === word.id);
    if (userWord) {
      isNewWord = false;
      let optionals = userWord.optional || {};
      let difficulty = userWord.difficulty;
      const answersChain = (optionals.answersChain || '').split(',');
      if (isRightAnswer) {
        const chain = optionals.rightChain || 0;
        const newChain = chain + 1;
        let limit = WORD_LEARNING_CHAIN;
        if (difficulty === 'hard') limit = DIFFICULT_WORD_LEARNING_CHAIN;
        if (newChain === limit) {
          isLearnedWord = true;
          optionals = { ...optionals, done: true };
          difficulty = 'weak';
        }
        optionals = {
          ...optionals,
          rightAnswers: (optionals.rightAnswers || 0) + 1,
          rightChain: newChain,
          answersChain: [...answersChain, 1].join(','),
        };
      } else {
        optionals = {
          ...optionals,
          wrongAnswers: (optionals.wrongAnswers || 0) + 1,
          rightChain: 0,
          done: false,
          answersChain: [...answersChain, 0].join(','),
        };
      }
      console.log(optionals);
      await updateUserWord(userId, token, userWord.wordId, difficulty, optionals);
    } else {
      let optionals: UserWordOptions = {
        rightAnswers: 0,
        rightChain: 0,
        wrongAnswers: 0,
        answersChain: '',
      };
      if (isRightAnswer) {
        optionals = {
          ...optionals,
          rightAnswers: 1,
          rightChain: 1,
          answersChain: [...optionals.answersChain.split(','), 1].join(','),
        };
      } else {
        optionals = {
          ...optionals,
          wrongAnswers: 1,
          answersChain: [...optionals.answersChain.split(','), 0].join(','),
        };
      }
      await addUserWord(userId, token, word.id, 'weak', optionals);
    }
    changeStatistic(userId, token, game, {
      rightAnswers: isRightAnswer ? 1 : 0,
      newWords: isNewWord ? 1 : 0,
      wrongAnswers: isRightAnswer ? 0 : 1,
      learnedWords: isLearnedWord ? 1 : 0,
      chainLength,
    });
    dispatch({ type: UsersWordsActionTypes.GET_USERS_WORDS });
    try {
      const userWords = await getUserWords(userId, token);
      dispatch({ type: UsersWordsActionTypes.SUCCESS, payload: userWords });
    } catch (e) {
      dispatch({ type: UsersWordsActionTypes.ERROR, payload: e as string });
    }
  };
