import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';

export const ValentineDino = ({ heart, dino }) => (
  <div className={styles.valentinesDino}>
    <div className={styles.subContainer}>
      <img
        src={heart}
        alt=""
        className={classnames(styles.heart, styles.moveVertical)}
      />
    </div>
    <div className={classnames(styles.subContainer, styles.c2)}>
      <img
        src={heart}
        alt=""
        className={classnames(styles.heart, styles.moveVertical)}
      />
    </div>
    <div className={classnames(styles.subContainer, styles.c3)}>
      <img
        src={heart}
        alt=""
        className={classnames(styles.heart, styles.moveVertical)}
      />
    </div>

    <img src={dino} alt="" className={styles.tRegx} />
  </div>
);
