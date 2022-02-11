import { TokenResponse, UserWordOptions } from '../../../types/requests';

export interface CardHardItemProps {
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
  userData: TokenResponse;
  userWordData: {
    difficulty: string;
    optional: UserWordOptions;
  };
}
