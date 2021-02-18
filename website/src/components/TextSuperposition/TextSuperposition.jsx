import React, {Component} from "react";

import styles from "./style.module.scss";

class Stopwatch {
  constructor(method, delay) {
    this.method = method;
    this.delay = delay;
    this.interval = null;
  }

  start() {
    if (this.interval === null) {
      this.interval = setInterval(this.method, this.delay);
    }
  }

  stop() {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

export default class extends Component {
  constructor(props) {
    super(props);
    const {texts} = props;
    if (!texts || texts.length === 0) {
      throw "TextSuperposition doesn't make sense without values";
    }
    this.state = {
      items: [...texts, texts[0]],
      slide: 0,
    };
    this.stopwatch = new Stopwatch(() => this.nextSlide(), 1000)
  }

  componentDidMount() {
    this.stopwatch.start();
  }

  componentWillUnmount() {
    this.stopwatch.stop();
  }

  nextSlide() {
    const newSlide = (this.state.slide + 1) % this.state.items.length;
    if (newSlide === this.state.items.length - 1) {
      setTimeout(() => this.setState({slide: 0}), 500);
    }
    return this.setState({slide: newSlide});
  }

  render() {
    return <span className={styles.parent}
                 onMouseEnter={() => this.stopwatch.stop()}
                 onMouseLeave={() => this.stopwatch.start()}>
      <span className={styles.container} style={style(this.state.slide)}>
        {this.state.items.map((item, index) => <span key={index} children={item}/>)}
      </span>
    </span>;
  }
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
