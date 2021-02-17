import React, {useEffect, useState} from "react";

import styles from "./style.module.scss";

export default ({texts}) => {
  const items = [...texts, texts[0]];

  const [slide, setSlide] = useState(0);

  function nextSlide(s) {
    const newSlide = (s + 1) % items.length;
    if (newSlide === items.length - 1) {
      setTimeout(() => setSlide(0), 500);
    }
    return newSlide;
  }

  useEffect(() => {
    const interval = setInterval(() => setSlide(s => nextSlide(s)), 1000);
    return () => clearInterval(interval);
  });

  return <span className={styles.parent}>
    <span className={styles.container} style={style(slide)}>
      {items.map((item, index) => <span key={index} children={item}/>)}
    </span>
  </span>;
}

function style(slide) {
  const height = (-26 * slide) - 1;

  if (slide === 0) {
    return {
      transition: 'none',
      transform: `translateY(${height}px)`
    };
  }

  return {
    transition: 'transform .3s',
    transform: `translateY(${height}px)`
  };
}
