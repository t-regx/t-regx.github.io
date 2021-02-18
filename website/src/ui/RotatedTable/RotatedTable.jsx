import React, {Fragment} from "react";

import Link from "../../components/Link/Link";

import {pregDocs} from "../../config/links";
import styles from './styles.module.scss';

export default function ({rows}) {
  return <table className={styles.rotatedTable} width="100%" border="0" cellSpacing="0" cellPadding="0">
    <tbody>
      {rows.map((row, index) => (
        <Fragment key={index}>
          <tr className={styles.heading}>
            <td>{row.title}</td>
          </tr>
          <tr>
            <td>{row.php}</td>
            <td className={styles.php}>
              <Link to={pregDocs}>
                <div className={styles.img}/>
              </Link>
            </td>
          </tr>
          <tr>
            <td>{row.tRegx}</td>
            <td className={styles.tregx}>
              <Link to="/">
                <div className={styles.img}/>
              </Link>
            </td>
          </tr>
        </Fragment>
      ))}
    </tbody>
  </table>;
}
