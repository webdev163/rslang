import { getAggregatedWords } from './aggregated-words';
import { signIn, getUserToken } from './signIn';
import { changeStatistic, getUserStatistic, updateUserStatistic } from './user-statistic';
import { addUser, getUser, updateUser, deleteUser } from './users';
import { addUserWord, deleteUserWord, getUserWord, getUserWords, updateUserWord } from './users-words';
import { getWords, getWord } from './words';

export {
  getWords,
  getWord,
  signIn,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getUserToken,
  getUserWords,
  getUserWord,
  addUserWord,
  updateUserWord,
  deleteUserWord,
  getUserStatistic,
  updateUserStatistic,
  getAggregatedWords,
  changeStatistic,
};
