import React, {useState} from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

export default ({answers, current, onPointClick}) => {
  const [navigated, setNavigated] = useState(false);

  return <div className={styles.container}>
    {answers.map((answer, index) =>
      <span key={index}
            className={classNames(styles.openAnimation, {[styles.dimmed]: index > current})}
            onClick={() => {
              onPointClick(index);
              if (index < answers.length - 1) {
                setNavigated(true);
              }
            }}>
        <BulletPoint value={answer}/>
      </span>
    )}
    {answers.length > 1 && !navigated && <small>Navigate back to see the explanations</small>}
  </div>;
};

const BulletPoint = ({value}) => {
  if (value === "correct") {
    return <b>✓</b>;
  }
  if (value === "incorrect") {
    return <span style={{color: '#ff4242'}}>✘</span>
  }
  if (value === "pending") {
    return <span>●</span>
  }
  if (value === "last") {
    return <span>★</span>
  }
  return null;
};
