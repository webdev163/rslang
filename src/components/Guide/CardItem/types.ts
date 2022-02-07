import { TokenResponse } from '../../../types/requests';

export interface CardItemProps {
  wordId: string;
  audio: string;
  audioExample: string;
  audioMeaning: string;
  image: string;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
  isAuthorized: boolean;
  userData: TokenResponse;
}
