import React from "react";
import Carousel from "nuka-carousel";

export default ({value, children}) => <Carousel
  withoutControls disableEdgeSwiping

  slideIndex={value}
  cellSpacing={700}
  slidesToShow={1}
  autoplay={false}
  easing="easeQuadIn"
  transitionMode="scroll"
  slidesToScroll="auto"
  frameOverflow="visible"
  heightMode="current"
  wrapAround={false}
  dragging={false}
  swiping={false}

  children={children}
/>;
