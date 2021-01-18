import classNames from "classnames";
import styles from "../pages/styles.module.scss";
import {Markdown} from "./Utils/code";
import React from "react";

export default props => <div className={classNames('padding-vert--xl', {
  [styles.scrollBackground]: props.scrollableBackground,
  [styles.darkBackground]: props.darkBackground,
  [styles.lightBackground]: props.lightBackground,
  'text--center': props.center,
})}>
  <div className="container">
    {props.children}
    {props.columns && <div className="row">
      {props.columns.map((column, index) => (
        <div key={index} className="col">
          {column.title && <h2>{column.title}</h2>}

          {column.body || column.content && <div>
            <Markdown>{column.content}</Markdown>
          </div>}
        </div>
      ))}
    </div>}
  </div>
</div>;
