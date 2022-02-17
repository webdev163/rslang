interface gameStatistics {
  id: string;
  date: string;
  learnedWords: number;
  newWords: number;
  chainLength: number;
  wrongAnswers: number;
  rightAnswers: number;
  percent: number;
}

export type {gameStatistics}
