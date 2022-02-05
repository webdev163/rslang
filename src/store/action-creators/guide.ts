import { Dispatch } from 'redux';
import { GuideAction, GuideActionTypes } from '../../types/guide';
import { getWords } from '../../utils/API';

export const fetchWords = (group = 0, page = 0) => {
  return async (dispatch: Dispatch<GuideAction>) => {
    try {
      dispatch({ type: GuideActionTypes.FETCH_WORDS });
      const response = await getWords(group, page);
      dispatch({ type: GuideActionTypes.FETCH_WORDS_SUCCESS, payload: response });
    } catch (e) {
      dispatch({
        type: GuideActionTypes.FETCH_WORDS_ERROR,
        payload: 'При загрузке слов произошла ошибка',
      });
    }
  };
};

export function setWordsGroup(group: number): GuideAction {
  return { type: GuideActionTypes.SET_WORDS_GROUP, payload: group };
}

export function setGuidePage(page: number): GuideAction {
  return { type: GuideActionTypes.SET_GUIDE_PAGE, payload: page };
}
