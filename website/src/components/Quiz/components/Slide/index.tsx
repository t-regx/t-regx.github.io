import React, {FunctionComponent, ReactNode, useState} from "react";
import classNames from 'classnames';

import {Markdown} from "../../../Utils/code";
import {mapAnswers} from "../mapper";
import {letter, PhpCode} from "../cosmethics";

import styles from "./styles.module.scss";
import {AnswerInt} from "../../Answer";

interface SlideProps {
  index: number,
  body: ReactNode,
  children: AnswerInt[],
  selfExplanatory: boolean,
  onClick: (correct: boolean) => void,
  onHover: (code: string | null) => void
}

export default ({index, body, children, selfExplanatory, onClick, onHover}: SlideProps) => {
  const [selected, setSelected] = useState(null);
  const [helpVisible, setHelpVisible] = useState(false);

  const handleAnswer = (index: number, correct: boolean) => {
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
      {mapAnswers(children, ({correct, markdown, code, children, help, markdownHelp = true, hoverCode}, index) =>
        <AnswerListItem
          key={index}
          selected={index === selected}
          correct={selected !== null ? correct : 'Nice try, you hacker :D What else you got?'}
          answered={selected !== null}
          help={helpVisible && help}
          hasHelp={!selfExplanatory}
          inactive={selfExplanatory ? selected !== null : helpVisible && help}
          markdownHelp={markdownHelp}
          onClick={() => handleAnswer(index, correct)}
          onMouseEnter={() => onHover(hoverCode)}
          onMouseLeave={() => onHover(null)}>
          <Answer index={index} markdown={markdown} code={code} children={children}/>
        </AnswerListItem>
      )}
    </ul>
  </>;
}

interface AnswerListItemInterface {
  children: React.ReactNode,
  selected: boolean,
  correct: boolean,
  answered: boolean,
  inactive: boolean,
  hasHelp: boolean,
  help: string | string[],
  markdownHelp: boolean,
  onClick: () => void,
  onMouseEnter: () => void,
  onMouseLeave: () => void,
}

const AnswerListItem = (props: AnswerListItemInterface) => {
  const {children, selected, correct, answered, inactive, hasHelp, help, markdownHelp} = props;
  const {onClick, onMouseEnter, onMouseLeave} = props;

  return <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div
      onClick={onClick}
      className={classNames(styles.listItem, {
        [styles.selected]: selected,
        [styles.correct]: selected && correct,
        [styles.incorrect]: selected && !correct,
        [styles.alreadyAnswered]: answered,
        [styles.inactive]: inactive,
        [styles.hasHelp]: hasHelp,
      })}>
      {children}
      {help && <Help help={help} markdown={markdownHelp}/>}
    </div>
  </li>
};

interface HelpProps {
  help: string | string[],
  markdown: boolean
}

const Help: FunctionComponent<HelpProps> = ({help, markdown}) => {
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

interface AnswerProps {
  index: number,
  markdown: boolean,
  children: React.ElementType[],
  code: string
}

const Answer: FunctionComponent<AnswerProps> = ({index, markdown, children, code}) => {
  const answers = markdown ? <Markdown>{children}</Markdown> : children;

  return <>
    <span>
      {letter(index)}.&nbsp;{answers}
    </span>
    {code && <div style={{marginTop: '3px'}}>
      <PhpCode>{code}</PhpCode>
    </div>}
  </>;
};
