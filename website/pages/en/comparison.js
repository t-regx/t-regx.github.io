const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const MarkdownBlock = CompLibrary.MarkdownBlock;

const DisqusThread = require(`${process.cwd()}/core/DisqusThread.js`);
const ComparisonTable = require(`${process.cwd()}/core/ComparisonTable.js`);

class Comparison extends React.Component {
    render() {
        return (
            <div className="docMainWrapper wrapper">
                <Container className="mainContainer documentContainer postContainer">
                    <div className="post">
                        <header className="postHeader">
                            <h1>Comparison table of plain PHP and T-Regx</h1>
                            <MarkdownBlock>
                                Here's a little table of some of the differences between the behaviour of plain PHP
                                `preg_*()` methods and T-Regx API.
                            </MarkdownBlock>
                        </header>

                        <ComparisonTable/>

                        <DisqusThread
                            shortName={'t-regx'}
                            identifier={'7eb37bee54d5e7315fd19ebdc4c56cf7'}
                            title={'Questions about T-Regx Comparison'}
                            url={'http://t-regx.com/comparison'}/>
                    </div>
                </Container>
            </div>
        );
    }
}

module.exports = Comparison;
