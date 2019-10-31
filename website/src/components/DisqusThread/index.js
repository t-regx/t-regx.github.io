import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const DisqusThread = ({
  shortName = 't-regx',
  identifier = '46dff8e37535ddb3571510672d1af48683bad013',
  title = 'Questions about T-Regx',
}) => {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const getMarkup = () => `
(function () {
  if (typeof window.disqus_shortname !== 'undefined') {
    return;
  }
  window.disqus_shortname = '${shortName}';
  window.disqus_identifier = '${identifier}';
  window.disqus_title = '${title}';
  window.disqus_url =  '${siteConfig.url + location.pathname}';
  if (window.DISQUS === undefined) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://t-regx.disqus.com/embed.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    window.DISQUS.reset({reload: true});
  }
})();
`;

  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.innerHTML = getMarkup();
    document.head.appendChild(script);
    return () => script.parentNode.removeChild(script);
  });

  return <div id="disqus_thread" />;
};
