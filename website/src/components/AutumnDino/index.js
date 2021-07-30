import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

export default function AutumnDino({leaves, dino}) {
  return <div className={styles.autumnDino}>
    <div className={styles.subContainer}>
      <img src={leaves[2]} className={classNames(styles.leaf, styles.animation, styles.slowFall)} alt=""/>
      <img src={leaves[0]} className={classNames(styles.leaf, styles.animation, styles.slowFall)} alt=""/>
      <img src={leaves[5]} className={classNames(styles.leaf, styles.animation, styles.slideFall)} alt=""/>
      <img src={leaves[5]} className={classNames(styles.leaf, styles.animation, styles.slowFall)} alt=""/>
      <img src={leaves[4]} className={classNames(styles.leaf, styles.animation, styles.slowFall, styles.reversed)} alt=""/>
      <img src={leaves[0]} className={classNames(styles.leaf, styles.animation, styles.blowFall)} alt=""/>
      <img src={leaves[1]} className={classNames(styles.leaf, styles.animation, styles.simpleFall)} alt=""/>
      <img src={leaves[3]} className={classNames(styles.leaf, styles.animation, styles.simpleFall)} alt=""/>
      <img src={leaves[3]} className={classNames(styles.leaf, styles.animation, styles.slowFall)} alt=""/>
      <img src={leaves[1]} className={classNames(styles.leaf, styles.animation, styles.slowFall)} alt=""/>
      <img src={leaves[0]} className={classNames(styles.leaf, styles.animation, styles.slideFall)} alt=""/>
      <img src={leaves[0]} className={classNames(styles.leaf, styles.animation, styles.rotateFall)} alt=""/>
    </div>
    <img src={dino} alt="" className={styles.tRegx}/>
  </div>;
};
