import React from 'react';

import badges from '../../data/badges';
import styles from './styles.module.css';
import {GithubButton} from "../index";

const Badge = props => (
  <a href={props.href} title={props.title}>
    <img src={props.src} alt={props.title}/>
  </a>
);

export default function BadgesSection() {
  const {upper: upperBadges, lower: lowerBadges} = badges;

  return (
    <div className={styles.badgesSection}>
      <div className={styles.upperBadges}>
        {upperBadges.map((badge, index) => (
          <Badge key={index} {...badge} />
        ))}
      </div>
      <div className={styles.lowerBadges}>
        {lowerBadges.map((badge, index) => (
          <Badge key={index} {...badge} />
        ))}
        <GithubButton/>
      </div>
    </div>
  );
};
