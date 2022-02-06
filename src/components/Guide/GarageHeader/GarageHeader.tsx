import React, { FC } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import ReactPaginate from 'react-paginate';

import styles from './GarageHeader.module.scss';

const GarageHeader: FC = () => {
  const { setWordsGroup, setGuidePage } = useActions();
  const { page } = useTypedSelector(state => state.guide);

  const changeDifficulty = (num: number) => {
    setWordsGroup(num);
    setGuidePage(0);
  };

  const handlePageClick = (event: { selected: number }) => {
    const page = event.selected;
    setGuidePage(page);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.difficultyWrapper}>
        <button className={`${styles.btnDifficulty} color-group-1`} onClick={() => changeDifficulty(0)}>
          A1
        </button>
        <button className={`${styles.btnDifficulty} color-group-2`} onClick={() => changeDifficulty(1)}>
          A2
        </button>
        <button className={`${styles.btnDifficulty} color-group-3`} onClick={() => changeDifficulty(2)}>
          B1
        </button>
        <button className={`${styles.btnDifficulty} color-group-4`} onClick={() => changeDifficulty(3)}>
          B2
        </button>
        <button className={`${styles.btnDifficulty} color-group-5`} onClick={() => changeDifficulty(4)}>
          C1
        </button>
        <button className={`${styles.btnDifficulty} color-group-6`} onClick={() => changeDifficulty(5)}>
          C2
        </button>
      </div>
      <ReactPaginate
        previousLabel={'🠔'}
        nextLabel={'🠖'}
        pageCount={30}
        onPageChange={e => handlePageClick(e)}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        forcePage={page}
      />
    </div>
  );
};

export default GarageHeader;
