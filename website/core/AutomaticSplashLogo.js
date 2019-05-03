const React = require('react');
const siteConfig = require(`${process.cwd()}/siteConfig.js`);
const ValentineDino = require(`${process.cwd()}/core/ValentineDino`);

function imgUrl(img) {
    return `${siteConfig.baseUrl}img/${img}`;
}

const Logo = props => (
    <div className="projectLogo">
        <img src={props.src} alt="Project Logo" title={props.title || ''}/>
    </div>
);

class SplashImage extends React.Component {
    render() {
        if (this.props.name === 'valentine') {
            return <ValentineDino
                heart={imgUrl('heart.png')}
                dino={imgUrl('t.regx.png')}
                title="Valentine's Day T-Regx"/>
        }
        const images = {
            regular: {src: 't.regx.png', title: 'T-Regx'},
            christmas: {src: 't.regx.santa.png', title: 'Santa T-Regx'},
            carnival: {src: 't.regx.carnival.png', title: 'Carnival T-Regx'},
            easter: {src: 't.regx.easter.png', title: 'Easter T-Regx'}
        };
        const splash = images[this.props.name];
        return <Logo src={imgUrl(splash.src)} title={splash.name}/>;
    }
}

class AutomaticSplashLogo extends React.Component {
    render() {
        return <SplashImage name={this.splashName()}/>
    }

    splashName() {

        return "regular";
    }
}

module.exports = AutomaticSplashLogo;
