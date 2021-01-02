import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import ValentineDino from '../ValentineDino';
import styles from './styles.module.css';

const Logo = ({src, title = ''}) => (
  <div className={styles.projectLogo}>
    <img src={src} alt="Project Logo" title={title}/>
  </div>
);

const SplashImage = ({name}) => {
  if (name === 'valentine') {
    return (
      <ValentineDino
        heart={useBaseUrl('img/heart.png')}
        dino={useBaseUrl('img/t.regx.png')}
        title="Valentine's Day T-Regx"
      />
    );
  }

  const images = {
    regular: {src: 't.regx.png', title: 'T-Regx'},
    corona: {src: 't.regx.surgical.png', title: 'Responsible T-Regx'},
    coronaXmas: {src: 't.regx.surgical.xmas.png', title: 'Responsible T-Regx'},
    carnival: {src: 't.regx.carnival.png', title: 'Carnival T-Regx'},
    easter: {src: 't.regx.easter.png', title: 'Easter T-Regx'},
    holiday: {src: 't.regx.summer.png', title: 'Holiday T-Regx'},
    halloween: {src: 't.regx.halloween.png', title: 'Halloween T-Regx'},
    christmas: {src: 't.regx.santa.png', title: 'Santa T-Regx'},
  };
  const splash = images[name];

  return <Logo src={useBaseUrl(`img/${splash.src}`)} title={splash.name}/>;
};

export default function AutomaticSplashLogo() {
  const daysInYear = (day, month) => day + month * 31;
  const splashNameByDate = (day, month) => {
    const splashImages = [
      {start: [30, 12], end: [2, 1], name: 'newyears'},
      {start: [12, 2], end: [17, 2], name: 'valentine'},
      {start: [6, 1], end: [25, 2], name: 'carnival'},
      {start: [20, 3], end: [4, 4], name: 'easter'},
      {start: [30, 6], end: [31, 8], name: 'holiday'},
      {start: [30, 10], end: [31, 10], name: 'halloween'},
      {start: [6, 12], end: [29, 12], name: 'christmas'},
    ];

    const image = splashImages.find(({start, end}) => {
      const _start = daysInYear(...start);
      const _end = daysInYear(...end);
      const current = daysInYear(day, month);

      return _start <= current && current <= _end;
    });

    return image ? image.name : 'regular';
  };

  const splashName = () => {
    const now = new Date();
//    return splashNameByDate(now.getDate(), now.getMonth() + 1);
    return 'corona';
  };

  return <SplashImage name={splashName()}/>;
};
