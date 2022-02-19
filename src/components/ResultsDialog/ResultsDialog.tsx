import React, { FC } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { ResultsDialogProps } from './types';
import { WordResponse } from '../../types/requests';
import { playSound } from '../../utils/utils';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import styles from './ResultsDialog.module.scss';

const ResultsDialog: FC<ResultsDialogProps> = ({ showResult }) => {
  const { score, rightAnswersArr, wrongAnswersArr } = useTypedSelector(state => state.audio);
  const { resetAudioState } = useActions();

  const generateResults = () => {
    const resultsRight = rightAnswersArr.map((word: WordResponse) => {
      return (
        <div key={word.id} className={styles.resultsItem}>
          <button className={styles.btnSound} onClick={() => playSound(word.audio, null, null)}></button>
          <p>
            <b>{word.word}</b> - {word.wordTranslate}
          </p>
        </div>
      );
    });
    const resultsWrong = wrongAnswersArr.map((word: WordResponse) => {
      return (
        <div key={word.id} className={styles.resultsItem}>
          <button className={styles.btnSound} onClick={() => playSound(word.audio, null, null)}></button>
          <p>
            <b>{word.word}</b> - {word.wordTranslate}
          </p>
        </div>
      );
    });

    return (
      <div>
        <p className={styles.resultsSubtitle}>Правильные ответы ({resultsRight.length ? resultsRight.length : 0}):</p>
        <div>{resultsRight}</div>
        <p className={styles.resultsSubtitle}>Неправильные ответы ({resultsWrong.length ? resultsWrong.length : 0}):</p>
        <div>{resultsWrong}</div>
      </div>
    );
  };

  if (!showResult) return <div></div>;

  return (
    <Dialog open={showResult} onClose={() => resetAudioState()}>
      <div className={styles.resultsWrapper}>
        <p style={{ fontSize: 18 }}>
          <b>Результат</b>: {score} баллов
        </p>
        {generateResults()}
      </div>
    </Dialog>
  );
};

export default ResultsDialog;
