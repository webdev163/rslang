import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { updateAudioStatistic } from '.';
import { AudioAction } from '../../types/audiocall';
import { GameStatistic, UserWordOptions, UserWordResponse, WordResponse } from '../../types/requests';
import { SprintAction } from '../../types/sprint';
import { UsersWordsActionTypes, UserWordsActions } from '../../types/user';
import { addUserWord, getUserWords, updateUserWord } from '../../utils/API';
import { DIFFICULT_WORD_LEARNING_CHAIN, WORD_LEARNING_CHAIN } from '../../utils/constants';
import { RootState } from '../reducers';
import { updateSprintStatistic } from './sprint';

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
    let statistic: GameStatistic;
    let chainLength: number;
    if (game === 'sprint') {
      statistic = state.sprint.statistic;
      chainLength = state.sprint.chainLength;
    } else {
      statistic = state.audio.statistic;
      chainLength = state.audio.chainLength;
    }
    const userWord = words.find(w => w.wordId === word.id);
    if (userWord) {
      let optionals = userWord.optional || {};
      let difficulty = userWord.difficulty;
      if (isRightAnswer) {
        const chain = optionals.rightChain || 0;
        const newChain = chain + 1;
        let limit = WORD_LEARNING_CHAIN;
        if (difficulty === 'hard') limit = DIFFICULT_WORD_LEARNING_CHAIN;
        if (newChain === limit) {
          optionals = { ...optionals, done: true };
          difficulty = 'weak';
          statistic = { ...statistic, learnedWords: statistic.learnedWords + 1 };
        }
        optionals = { ...optionals, rightAnswers: (optionals.rightAnswers || 0) + 1, rightChain: newChain };
        statistic = {
          ...statistic,
          rightAnswers: statistic.rightAnswers + 1,
          chainLength: Math.max(statistic.chainLength, chainLength + 1),
        };
      } else {
        optionals = { ...optionals, wrongAnswers: (optionals.wrongAnswers || 0) + 1, rightChain: 0, done: false };
        statistic = { ...statistic, wrongAnswers: statistic.wrongAnswers + 1 };
      }
      await updateUserWord(userId, token, userWord.wordId, difficulty, optionals);
    } else {
      let optionals: UserWordOptions = {
        rightAnswers: 0,
        rightChain: 0,
        wrongAnswers: 0,
      };
      statistic = { ...statistic, newWords: statistic.newWords + 1 };
      if (isRightAnswer) {
        optionals = { ...optionals, rightAnswers: 1, rightChain: 1 };
        statistic = { ...statistic, rightAnswers: statistic.rightAnswers + 1, chainLength: statistic.chainLength + 1 };
      } else {
        optionals = { ...optionals, wrongAnswers: 1 };
        statistic = { ...statistic, wrongAnswers: statistic.wrongAnswers + 1 };
      }
      await addUserWord(userId, token, word.id, 'weak', optionals);
    }
    if (game === 'sprint') {
      console.log(statistic);
      dispatch(updateSprintStatistic(statistic));
    } else {
      dispatch(updateAudioStatistic(statistic));
    }
    dispatch({ type: UsersWordsActionTypes.GET_USERS_WORDS });
    try {
      const userWords = await getUserWords(userId, token);
      dispatch({ type: UsersWordsActionTypes.SUCCESS, payload: userWords });
    } catch (e) {
      dispatch({ type: UsersWordsActionTypes.ERROR, payload: e as string });
    }
  };
