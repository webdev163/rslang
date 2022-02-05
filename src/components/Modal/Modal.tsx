import React, { FC, ReactNode } from 'react';

import styles from './Modal.module.scss';

interface IModal {
  children?: ReactNode;
}

const Modal: FC<IModal> = ({ children }) => {
  return <div className={styles.modal}>{children}</div>;
};

export default Modal;
