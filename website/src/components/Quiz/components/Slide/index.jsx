import React, {useState} from "react";
import classNames from 'classnames';

import {Markdown} from "../../../Utils/code";
import {mapAnswers} from "../mapper";
import {letter, PhpCode} from "../cosmethics";

import styles from "./styles.module.scss";

export default ({index, body, children, selfExplanatory, onClick}) => {
  const [selected, setSelected] = React.useState(null);
  const [helpVisible, setHelpVisible] = useState(false);

  const handleAnswer = (index, correct) => {
    if (selected === null) {
      onClick && onClick(correct);
      setSelected(index);
    } else {
      setHelpVisible(true);
    }
  }

  return <>
    <h3>Question #{index + 1}</h3>
    {body}
    <ul className={styles.answers}>
      {mapAnswers(children, ({correct, markdown, code, children, help, markdownHelp = true}, index) =>
        <AnswerListItem
          key={index}
          selected={index === selected}
          correct={selected !== null ? correct : 'Nice try, you hacker :D What else you got?'}
          answered={selected !== null}
          help={helpVisible && help}
          hasHelp={!selfExplanatory}
          inactive={selfExplanatory ? selected !== null : helpVisible && help}
          markdownHelp={markdownHelp}
          onClick={() => handleAnswer(index, correct)}>
          <Answer index={index} markdown={markdown} code={code} children={children}/>
        </AnswerListItem>
      )}
    </ul>
  </>;
}

const AnswerListItem = ({children, selected, correct, answered, onClick, inactive, hasHelp, help, markdownHelp}) => {
  return <li
    className={classNames({
      [styles.selected]: selected,
      [styles.correct]: selected && correct,
      [styles.incorrect]: selected && !correct,
      [styles.alreadyAnswered]: answered,
      [styles.inactive]: inactive,
      [styles.hasHelp]: hasHelp,
    })}
    onClick={onClick}>
    {children}
    {help && <Help help={help} markdown={markdownHelp}/>}
  </li>
};

const Help = ({help, markdown}) => {
  const elements = Array.isArray(help) ? help : [help];

  const md = element => {
    if (element.type === React.Fragment) {
      return <Markdown children={element.props.children}/>;
    }
    return <Markdown children={element}/>;
  }

  return <div className={styles.help}>
    {elements.map(element => <p>ⓘ {markdown ? md(element) : element}</p>)}
  </div>;
}

const Answer = ({index, markdown, children, code}) => {
  const answers = markdown ? <Markdown>{children}</Markdown> : children;

  return <>
    <span>
      {letter(index)}.&nbsp;{answers}
    </span>
    {code && <div style={{marginTop: '3px'}}>
      <PhpCode>{code}</PhpCode>
    </div>}
  </>;
}
