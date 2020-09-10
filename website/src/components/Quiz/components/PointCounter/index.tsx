import React, {useState} from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

export type AnswerType = "correct" | "incorrect" | "pending" | "last";

interface PointCounterProps {
  answers: AnswerType[],
  current: number,
  onPointClick: (number) => void
}

export default ({answers, current, onPointClick}: PointCounterProps) => {
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
    {answers.length > 1 && !navigated && <small>Click ✓ or ✘ to see the explanation</small>}
  </div>;
};

interface BulletPointProps {
  value: AnswerType
}

const BulletPoint = ({value}: BulletPointProps) => {
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
};
