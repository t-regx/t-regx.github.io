import React, {useEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function DisqusThread(attributes) {
  const {
    shortName = 't-regx',
    identifier = '46dff8e37535ddb3571510672d1af48683bad013',
    title = 'Questions about T-Regx'
  } = attributes;

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
      window.DISQUS.reset({reload: true, config,});
    } else {
      window.disqus_config = config;

      const script = document.createElement('script');
      script.src = `https://${shortName}.disqus.com/embed.js`;
      script.setAttribute('data-timestamp', +new Date());
      script.setAttribute('async', true);

      document.body.appendChild(script);
    }
  });

  return <div id="disqus_thread"/>;
};
