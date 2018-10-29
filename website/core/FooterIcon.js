const React = require('react');

class FooterIcon extends React.Component {
    get src() {
        return this.props.baseUrl + 'img/t.regx.png';
    }

    render() {
        return (
            <a href={this.props.baseUrl} className="nav-home">
                <img src={this.src} alt='T-Regx' width="64" height="52"/>
            </a>
        );
    }
}

module.exports = FooterIcon;
