import React from 'react';

import badges from '../../data/badges';
import styles from './styles.module.css';
import StarButton from "../Github/StarButton";

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
        <StarButton/>
      </div>
    </div>
  );
};

const Badge = ({title, href, src}) => (
  <a href={href} title={title}>
    <img src={src} alt={title}/>
  </a>
);
