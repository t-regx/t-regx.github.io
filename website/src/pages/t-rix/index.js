import React from 'react';
import Markdown from 'markdown-to-jsx';
import Layout from '@theme/Layout';

function MatrixPage() {
  return (
    <Layout>
      <div className="container margin-vert--xl">
        <div className="post">
          <img src="/img/blue-matrix-wide.jpg" alt="Matrix code" />
        </div>

        <br />

        <div className="post" style={{ display: 'flex' }}>
          <img src="/img/t.regx.matrix.png" alt="T-Regx in the dream world" />
          <Markdown>
            > Have you ever had a dream, that you were so sure was real? What if
            you were unable to wake from that dream? How would you know the
            difference between the dream world and the real world?
          </Markdown>
        </div>
      </div>
    </Layout>
  );
}

export default MatrixPage;
