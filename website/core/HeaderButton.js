const React = require('react');

class HeaderButton extends React.Component {
    render() {
        return (
            <div className="pluginWrapper buttonWrapper">
                <a className="button" href={this.props.href} target={this.props.target}>
                    {this.props.children}
                </a>
            </div>
        );
    }
}

HeaderButton.defaultProps = {
    target: '_self',
};

module.exports = HeaderButton;
