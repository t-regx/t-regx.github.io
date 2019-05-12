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
        const now = new Date();
        return this.splashNameByDate(now.getDate(), now.getMonth() + 1);
    }

    splashNameByDate(day, month) {
        const image = this
            .splashImages()
            .find(({start, end}) => {
                const _start = daysInYear(...start);
                const _end = daysInYear(...end);
                const current = daysInYear(day, month);

                return _start <= current && current <= _end;
            });

        return image ? image.name : "regular";
    }

    splashImages() {
        return [
			{start: [30, 12], end: [2, 1], name: 'newyears'},
            {start: [12, 2], end: [17, 2], name: 'valentine'},
            {start: [6, 1], end: [25, 2], name: 'carnival'},
            {start: [20, 3], end: [4, 4], name: 'easter'},
            {start: [30, 6], end: [31, 8], name: 'holiday'},
			{start: [30, 10], end: [31, 10], name: 'halloween'},
            {start: [6, 12], end: [29, 12], name: 'christmas'},
	
        ];
    }
}

function daysInYear(day, month) {
    return day + month * 31;
}

module.exports = AutomaticSplashLogo;
