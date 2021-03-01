import React from 'react';
import Layout from '@theme/Layout';

import DisqusThread from "../../components/DisqusThread/DisqusThread";
import tRegxMatrix from "../../../static/img/t.regx.matrix.png";

import styles from "./index.module.scss";

export default function MatrixPage() {
  return <div className={styles.matrixBackground}>
    <Layout>
      <div className="container margin-vert--xl">
        <div className={styles.post}>
          <blockquote>
            <img src={tRegxMatrix} alt="T-Regx in the dream world"/>
            <div>
              <p>Have you ever had a dream, that you were so sure was real?</p>
              <p>
                What if you were unable to wake from that dream? How would you know the
                difference between the dream world and the real world?
              </p>
            </div>
          </blockquote>
        </div>
        <div className={styles.youtube}>
          <YouTubeEmbedded/>
        </div>
        <div className={styles.commentsBackground}>
          <DisqusThread
            title='T-Regx Matrix'
            identifier='34641aa1c25319a367666d815a258466'/>
        </div>
      </div>
    </Layout>
  </div>;
}

function YouTubeEmbedded() {
  return <iframe
    width="560" height="315"
    src="https://www.youtube.com/embed/G7RgN9ijwE4"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>;
}
