import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

export default function ValentineDino({className, heart, dino}) {
  return <div className={classNames(className, styles.valentinesDino)}>
    <div className={styles.subContainer}>
      <img src={heart} alt="" className={classNames(styles.heart, styles.moveVertical)}/>
    </div>
    <div className={classNames(styles.subContainer, styles.c2)}>
      <img src={heart} alt="" className={classNames(styles.heart, styles.moveVertical)}/>
    </div>
    <div className={classNames(styles.subContainer, styles.c3)}>
      <img src={heart} alt="" className={classNames(styles.heart, styles.moveVertical)}/>
    </div>
    <img src={dino} alt="" className={styles.tRegx}/>
  </div>;
};
