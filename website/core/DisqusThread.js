import React from 'react';
import PropTypes from 'prop-types';

class DisqusThread extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
    };

    render() {
        const WEBSITE_URL = 'http://www.t-regx.github.io';
        let {id, title, path, ...other} = this.props;
        if (process.env.BROWSER) {
            window.disqus_shortname = 't-regx';
            window.disqus_identifier = id;
            window.disqus_title = title;
            window.disqus_url = WEBSITE_URL + path;
        }
        return (
            <div>
                <div dangerouslySetInnerHTML={this.createMarkup()}/>
                <div {...other} id="disqus_thread"/>
            </div>
        );
    }

    createMarkup() {
        return {
            __html: `
<script>
    (function () {
        if (window.DISQUS === undefined) {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://t-regx.disqus.com/embed.js';
            document.getElementsByTagName('head')[0].appendChild(script);
    
        } else {
            window.DISQUS.reset({reload: true});
        }
    })();
</script>`
        };
    }
}

module.exports = DisqusThread;