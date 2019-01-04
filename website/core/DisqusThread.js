import React from 'react';
import PropTypes from 'prop-types';

class DisqusThread extends React.Component {
    static propTypes = {
        shortName: PropTypes.string.isRequired,
        identifier: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    };

    render() {
        let {shortName, identifier, title, url, ...other} = this.props;
        return (
            <div>
                <div dangerouslySetInnerHTML={this.createMarkup(shortName, identifier, title, url)}/>
                <div {...other} id="disqus_thread"/>
            </div>
        );
    }

    createMarkup(shortName, identifier, title, url) {
        return {
            __html: `
<script>
    (function () {
        window.disqus_shortname = '${shortName}';
        window.disqus_identifier = '${identifier}';
        window.disqus_title = '${title}';
        window.disqus_url = '${url}';
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