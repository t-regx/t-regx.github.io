const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const MarkdownBlock = CompLibrary.MarkdownBlock;

const metaDescription = require(`${process.cwd()}/core/MetaDescription`);

class MatrixPage extends React.Component {
    render() {
        return (
            <div className="docMainWrapper wrapper">
                <Container className="mainContainer documentContainer postContainer">
                    <div className="post">
                        <img src="/img/blue-matrix-wide.jpg" alt="Matrix code"/>
                    </div>
                    <br/>
                    <div className="post" style={{display: 'flex'}}>
                        <img src="/img/t.regx.matrix.png" alt="T-Regx in the dream world"/>
                        <MarkdownBlock>
                            > Have you ever had a dream, that you were so sure was real? What if you were
                            unable to wake from that dream? How would you know the difference between the dream
                            world and the real world?
                        </MarkdownBlock>
                    </div>
                </Container>
            </div>
        );
    }
}

MatrixPage.description = metaDescription;
module.exports = MatrixPage;
