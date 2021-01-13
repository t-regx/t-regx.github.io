import React, {useEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function ({title, identifier}) {
  const context = useDocusaurusContext();

  const config = function () {
    this.page.identifier = identifier;
    if (title) {
      this.page.title = title;
    }
    this.page.url = location.href;
  };

  useEffect(() => {
    if (window.DISQUS) {
      window.DISQUS.reset({reload: true, config});
    } else {
      window.disqus_config = config;

      const script = document.createElement('script');
      script.src = `https://t-regx.disqus.com/embed.js`;
      script.setAttribute('data-timestamp', '' + (+new Date()));
      script.setAttribute('async', 'true');

      document.body.appendChild(script);
    }
  });

  return <div id="disqus_thread"/>;
};
