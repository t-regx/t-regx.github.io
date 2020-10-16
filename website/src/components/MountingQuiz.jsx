import React, {Component} from "react";
import Quiz from "./Quiz/components/Quiz";

/**
 * There is some wired bug with "nuka-carousel", where the slides have
 * width: 0px before the component is mounted, yet it is still displayed
 * with that size 0px. I tried to set "width" or "initialWidth"
 * in "nuka-carousel" but it didn't change the size before mount.
 *
 * So I made this trick, where only the initial slide is visible before mount,
 * and the real carousel will be rendered after mount.
 */
export default class MountingQuiz extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {mountedOnce: false};
  }

  componentDidMount() {
    this.setState({mountedOnce: true});
  }

  render() {
    if (this.state.mountedOnce) {
      return <Quiz
        questions={this.props.questions}
        openingSlide={this.props.openingSlide}
        finishSlide={this.props.finishSlide}/>;
    }
    if (this.props.openingSlide) {
      return this.props.openingSlide(() => {
      });
    }
    return <></>;
  }
}
