import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const DisqusThread = ({
  shortName = 't-regx',
  identifier = '46dff8e37535ddb3571510672d1af48683bad013',
  title = 'Questions about T-Regx',
  path = '',
}) => {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const config = function() {
    this.page.identifier = identifier;

    if (title) {
      this.page.title = title;
    }

    this.page.url = location.href;
  };

  useEffect(() => {
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config,
      });
    } else {
      window.disqus_config = config;

      const script = document.createElement('script');
      script.src = `https://${shortName}.disqus.com/embed.js`;
      script.setAttribute('data-timestamp', +new Date());
      script.setAttribute('async', true);

      document.body.appendChild(script);
    }
  });

  return <div id="disqus_thread" />;

  //   const getMarkup = () => `
  // (function () {
  //   var disqus_config = function () {
  //     this.page.url = '${siteConfig.url + location.pathname}';
  //     this.page.identifier = '${identifier}';
  //   };

  //   var d = document, s = d.createElement('script');
  //   s.src = 'https://t-regx.disqus.com/embed.js';
  //   s.setAttribute('data-timestamp', +new Date());
  //   (d.head || d.body).appendChild(s);
  // })();
  // `;

  //   useEffect(() => {
  //     window.test = '123';

  //     const script = document.createElement('script');
  //     script.setAttribute('type', 'text/javascript');
  //     script.innerHTML = getMarkup();
  //     document.head.appendChild(script);
  //     return () => script.parentNode.removeChild(script);
  //   });

  //   return <div id="disqus_thread" />;
};
