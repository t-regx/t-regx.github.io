import React from 'react';
import Layout from '@theme/Layout';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import {DisqusThread} from '@site/src/components';

export default function BlogPostPage({content: BlogPostContents}) {
  const {metadata} = BlogPostContents;

  return (
    <Layout title={metadata.title} description={metadata.description}>
      {BlogPostContents && (
        <div className="container margin-vert--md">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <BlogPostItem frontMatter={BlogPostContents.frontMatter} metadata={metadata}>
                <BlogPostContents/>
              </BlogPostItem>
              <div className="margin-vert--xl">
                <BlogPostPaginator nextItem={metadata.nextItem} prevItem={metadata.prevItem}/>
              </div>
            </div>
          </div>

          <DisqusThread
            identifier={metadata.permalink}
            path={metadata.permalink}
            title={metadata.title}/>
        </div>
      )}
    </Layout>
  );
}
